import billboard
import json

from datetime import date, timedelta


# print(chart)
def daterange(start_date: date, end_date: date):
    for n in range(0, int((end_date - start_date).days), 7):
        yield start_date + timedelta(n)

def main():
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
if __name__ == '__main__':
    main()