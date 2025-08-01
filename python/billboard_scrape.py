import billboard
import json

from datetime import date, timedelta


# print(chart)
def daterange(start_date: date, end_date: date):
    for n in range(0, int((end_date - start_date).days), 7):
        yield start_date + timedelta(n)

def billboard_scrape_latin_songs():
    START_YEAR = 2017
    END_YEAR = 2025
    for year in range(START_YEAR, END_YEAR):
        start_dt = date(year, 1, 1)
        end_dt = date(year, 12, 31)
        year_songs = set()
        for dt in daterange(start_dt, end_dt):
            print(f'searching billboard chart for date {dt.strftime("%Y-%m-%d")}...')
            try:
                chart = billboard.ChartData('latin-songs', date=dt.strftime("%Y-%m-%d"))
                for song in chart.entries:
                    year_songs.add((song.title, song.artist))
                print('done.')
            except (billboard.BillboardNotFoundException, billboard.BillboardParseException) as e:
                print(e)
                continue
        print('year songs size: ', len(year_songs))
        year_songs_as_dicts = []
        for t, a in year_songs:
            year_songs_as_dicts.append({"title": t, "artist": a})
        print(f'saving data to file {year}...')
        with open(f'data/{year}.json', 'w') as f:
            json.dump(year_songs_as_dicts, f)

def prune_song_data():
    # pruning december songs bleeding into january.
    # do we want to prune from december of previous year OR 
    # from january of the next year?
    # thinking about it.
    # could go either way, but what makes most sense?
    # i don't want previous years songs bleeding into next year,
    # so i think we'll remove songs from january instead of dec
    # of previous year. Yes.
    START_YEAR = 1986
    END_YEAR = 2024
    prune_count = 0
    for year in range(START_YEAR, END_YEAR):
        with open(f'data/{year}.json') as f:
            songs_curr_year = json.load(f)
            songs_next_year = []
            print(f'year {year} songs size: ', len(songs_curr_year))
            with open(f'data/{year+1}.json') as f2:
                songs_next_year = json.load(f2)
                songs_before_prune = len(songs_next_year)
                print(f'year {year+1} songs size: ', len(songs_next_year))
                for song_curr_year in songs_curr_year:
                    # check if index exists in songs_next_year
                    index = -1
                    for i, song in enumerate(songs_next_year):
                        if (song_curr_year['title'] == song['title'] and
                            song_curr_year['artist'] == song['artist']):
                            index = i
                            break
                    if index != -1:
                        prune_count += 1
                        songs_next_year.pop(index)
                print(f'songs pruned this round: ', songs_before_prune - len(songs_next_year))
            if songs_next_year:
                with open(f'data/{year+1}.json', 'w') as f3:
                    json.dump(songs_next_year, f3)
        print(f'pruned so far: {prune_count}')
    print(f'total prune count: {prune_count}')

def count_songs():
    START_YEAR = 1993
    END_YEAR = 2024
    count = 0
    for year in range(START_YEAR, END_YEAR+1):
        with open(f'data/{year}.json') as f:
            songs = json.load(f)
            print(f'song count for {year}: {len(songs)}')
            count += len(songs)
    print(f'songs count for {START_YEAR}-{END_YEAR}: {count}')

def main():
    # billboard_scrape_latin_songs()
    # prune_song_data()
    count_songs()


if __name__ == '__main__':
    main()