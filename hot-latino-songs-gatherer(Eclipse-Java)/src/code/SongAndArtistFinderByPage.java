package code;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;

import org.apache.commons.lang3.text.WordUtils;

import edu.duke.URLResource;

public class SongAndArtistFinderByPage {
    
    public static ArrayList<String> findSongTitles(String url) {
        URLResource page = new URLResource(url);
        String source = page.asString();
        ArrayList<String> songList = new ArrayList<String>();
        int start = 0;
        
        while (true) {
            int targetIdx = source.indexOf("Song Hover-", start);
            if (targetIdx == -1) {
                break;
            }
            int beginning = targetIdx+11;
            int ending = source.indexOf("\"", beginning);
            String song = WordUtils.capitalizeFully(source.substring(beginning, ending).trim());
            songList.add(song);
            
            start = ending + 1;
        }
        
        return songList;
    }
    
    public static ArrayList<String> findSongArtists(String url) {
        URLResource page = new URLResource(url);
        String source = page.asString();
        ArrayList<String> artistList = new ArrayList<String>();
        int start = 0;
        
        while (true) {
            int targetIdx = source.indexOf("chart-row__artist\"", start);
            if (targetIdx == -1) {
                break;
            }
            int beginning = source.indexOf(">", targetIdx) ;
            int ending = source.indexOf("<", beginning);
            String artist = WordUtils.capitalizeFully(source.substring(beginning+1, ending).trim());
            artistList.add(artist);
            
            start = ending + 1;
        }
        
        return artistList;
    }
    
    public static ArrayList<String> findSongsWeeklyInOneYear(String staticURL, int Year, int month, int day) {
        ArrayList<String> songList = new ArrayList<String>();
        
        Calendar cal = Calendar.getInstance();
        cal.clear();
        cal.set(Year,  (month-1), day);
        int year = cal.get(Calendar.YEAR);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        while (year >= cal.get(Calendar.YEAR)) {
            System.out.println("Scraping page: " + staticURL + sdf.format(cal.getTime()));
            
            URLResource currPage = new URLResource(staticURL + sdf.format(cal.getTime()));
            String source = currPage.asString();
            System.out.println("loading...");
            //song finder
            int start = 0;
            
            while (true) {
                int targetIdx = source.indexOf("Song Hover-", start);
                if (targetIdx == -1) {
                    break;
                }
                int beginning = targetIdx+11;
                int ending = source.indexOf("\"", beginning);
                String song = WordUtils.capitalizeFully(source.substring(beginning, ending).trim());
                songList.add(song);
                
                start = ending + 1;
            }
            
            System.out.println("Done\n");
            cal.add(Calendar.DAY_OF_MONTH, 7);
        }
        return songList;
    }
    
    public static ArrayList<String> findArtistsWeeklyInOneYear(String staticURL, int Year, int month, int day) {
        ArrayList<String> artistList = new ArrayList<String>();
        
        for (LocalDate date = LocalDate.of(Year, month, day); date.getYear() < Year+1; date = date.plusWeeks(1)) {
            System.out.println("Scraping page: " + staticURL + DateTimeFormatter.ISO_DATE.format(date));
            
            URLResource currPage = new URLResource(staticURL + DateTimeFormatter.ISO_DATE.format(date));
            String source = currPage.asString();
            System.out.println("loading...");

            //artist finder
            int start = 0;
            
            while (true) {
                int targetIdx = source.indexOf("chart-row__artist\"", start);
                if (targetIdx == -1) {
                    break;
                }
                int beginning = source.indexOf(">", targetIdx) ;
                int ending = source.indexOf("<", beginning);
                String artist = WordUtils.capitalizeFully(source.substring(beginning+1, ending).trim());
                artistList.add(artist);
                
                start = ending + 1;
            }
            
            System.out.println("Done\n");
        }
        return artistList;
    }
    
public static void testFindSongsinYearByWeek(String url) {
        
        ArrayList<String> test = findSongsWeeklyInOneYear(url, 1986, 9, 20);
        System.out.println("Songs:\n");
        for (int i = 0; i < test.size(); i++) {
            //System.out.println(test.get(i));
            System.out.println((i+1) + ": " + test.get(i));
        }
    }

public static void testFindArtistsinYearByWeek(String url) {
    
    ArrayList<String> test = findArtistsWeeklyInOneYear(url, 1986, 9, 20);
    System.out.println("Artists:\n");
    for (int i = 0; i < test.size(); i++) {
        //System.out.println(test.get(i));
        System.out.println((i+1) + ": " + test.get(i));
    }
}
    
    
    
    
    
    
    
    public static void testFindSongs(String url) {
        
        ArrayList<String> test = findSongTitles(url);
        System.out.println("Songs:\n");
        for (int i = 0; i < test.size(); i++) {
            System.out.println(test.get(i));
            //System.out.println((i+1) + ": " + test.get(i));
        }
    }
    
    public static void testFindArtists(String url) {
        ArrayList<String> test = findSongArtists(url);
        System.out.println("\nArtists:\n");
        for (int i = 0; i < test.size(); i++) {
            System.out.println(test.get(i));
            //System.out.println((i+1) + ": " + test.get(i));
        }
    }
    
    public static void main(String args[]) {
        //URLResource page = new URLResource("http://www.billboard.com/charts/year-end/2012/hot-latin-songs");
        //String source = page.asString();
        //System.out.println(source);
        String url = "http://www.billboard.com/charts/year-end/2015/hot-latin-songs";
        //testFindSongsinYearByWeek(url);
        //testFindArtistsinYearByWeek(url);
        testFindSongs(url);
        testFindArtists(url);
        
    }
    
    

}
