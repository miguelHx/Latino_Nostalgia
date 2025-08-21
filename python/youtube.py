import googleapiclient.discovery
import os
import json

try:
    YOUTUBE_API_KEY = os.environ['YOUTUBE_API_KEY']
except KeyError:
    print('Youtube api key env variable not set')
    exit()

youtube = googleapiclient.discovery.build(serviceName='youtube', version='v3', developerKey=YOUTUBE_API_KEY)

'''
Search Results JSON
https://developers.google.com/youtube/v3/docs/search#resource
{
    "kind": "youtube#searchResult",
    "etag": etag,
    "id": {
        "kind": string,
        "videoId": string,
        "channelId": string,
        "playlistId": string
    },
    "snippet": {
        "publishedAt": datetime,
        "channelId": string,
        "title": string,
        "description": string,
        "thumbnails": {
          (key): {
              "url": string,
              "width": unsigned integer,
              "height": unsigned integer
          }
        },
        "channelTitle": string,
        "liveBroadcastContent": string
    }
}
'''
class SearchResult:
    def __init__(self, search_result) -> None:
        self.video_id = search_result['id']['videoId']
        self.title = search_result['snippet']['title']
        self.description = search_result['snippet']['description']
        self.thumbnails = search_result['snippet']['thumbnails']['default']['url']

'''
Search Response JSON
https://developers.google.com/youtube/v3/docs/videos/list#response
{
    "kind": "youtube#searchListResponse",
    "etag": etag,
    "nextPageToken": string,
    "prevPageToken": string,
    "regionCode": string,
    "pageInfo": {
        "totalResults": integer,
        "resultsPerPage": integer
    },
    "items": [
        search Resource
    ]
}
'''
class SearchResponse:
    def __init__(self, search_response) -> None:
        self.prev_page_token = search_response.get('prevPageToken')
        self.next_page_token = search_response.get('nextPageToken')

        # items contain list of videos
        items = search_response.get('items')
        self.search_results = []
        for item in items:
            search_result = SearchResult(item)
            self.search_results.append(search_result)


def search_yt(query, max_results=4, page_token=None):
    # reference: https://developers.google.com/youtube/v3/docs/search/list
    # reference: https://developers.google.com/youtube/v3/guides/implementation/pagination
    request = youtube.search().list(
        part="snippet", # search by keyword
        maxResults=max_results,
        pageToken=page_token, # optional, for going to next/prev result page
        q=query,
        type="video", # only include videos, not playlists/channels
    )
    response = request.execute()
    search_response = SearchResponse(response)
    return search_response

def display_yt_results(search_response):
    print('search results array size: ', len(search_response.search_results))
    for search_result in search_response.search_results:
        print(f'Video ID: {search_result.video_id}')
        print(f'Title: {search_result.title}')
        print()

def get_video_view_count(id):
    request = youtube.videos().list(
        part="statistics",
        id=id
    )
    response = request.execute()
    view_count = response['items'][0]['statistics']['viewCount']
    return view_count

def get_youtube_links_from_songs():
    START_YEAR = 2002
    END_YEAR = 2002
    for year in range(START_YEAR, END_YEAR+1):
        songs = []
        file_path = f'data/{year}.json'
        try:
            with open(file_path) as f:
                songs = json.load(f)
                print('songs size: ', len(songs))
                for song in songs:
                    if 'yt_id' not in song:
                        query = f'{song['artist']} {song['title']}'
                        print(f'searching query: {query}')
                        try:
                            search_response = search_yt(query)
                            video_id = search_response.search_results[0].video_id
                        except googleapiclient.errors.HttpError as e:
                            print('Error youtube API: ', e)
                            print('saving song data gathered so far...')
                            with open(f'data/{year}.json', 'w') as f:
                                json.dump(songs, f)
                            exit()
                        except Exception as e:
                            print('exception: ', e)
                            print('search query no result. Skipping this song.')
                            continue
                        print(f'video id found: {video_id}')
                        song['yt_id'] = video_id
                    else:
                        print(f'this song already has yt_id, skipping...')
        except json.JSONDecodeError as e:
            print(f'Error decoding JSON: {e}')
            exit()
        except FileNotFoundError:
            print(f'File not found: {file_path}')
            exit()

        if songs:
            with open(f'data/{year}.json', 'w') as f:
                json.dump(songs, f)
        break

def main():
    # search_response = search_yt('Millie Y Los Vecinos Calimin y Chulumein')
    # display_yt_results(search_response)
    # print(f'view count: {get_video_view_count(search_response.search_results[0].video_id)}')
    get_youtube_links_from_songs()
    # get this song video id manually because youtube api fails to retrieve it:
    # {"title": "Calimin y Chulumein", "artist": "Millie Y Los Vecinos"}

if __name__ == '__main__':
    main()
