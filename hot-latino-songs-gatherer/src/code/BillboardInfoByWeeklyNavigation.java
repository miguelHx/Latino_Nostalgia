package code;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;

import org.apache.commons.lang3.text.WordUtils;

import edu.duke.ResourceException;
import edu.duke.URLResource;

/**
 * This class(object) is responsible for holding the array lists
 * of a certain year from the billboard website latino version.
 * Gets the artists and songs in separate array lists by iterating
 * through the weekly format (format of links is /year-month-day)(NOT YEAR END) 
 * (ex: http://www.billboard.com/charts/latin-songs/1986-09-20)
 * @author Miguel Hernandez
 *
 */

public class BillboardInfoByWeeklyNavigation {
	private ArrayList<String> songs; //ArrayList
	private ArrayList<String> artists;
	private int year;
	private int month;
	private int day;
	private String staticURL; 
	//format of links is /year-month-day
	
	public BillboardInfoByWeeklyNavigation(int year, int month, int day) {
		songs = new ArrayList<String>();
		artists = new ArrayList<String>();
		this.year = year;
		this.month = month;
		this.day = day;
		staticURL = "http://www.billboard.com/charts/latin-songs/";
		buildList();
		getRidOfRepeats();
	}
	
	public int getYear() {
		return year;
	}

	public String getURLStart() {
		return staticURL;
	}
	
	private void buildList() {
		//start with URLStart
		songs = findSongTitles();
		artists = findArtistNames();
		
	}
	
	private ArrayList<String> findSongTitles() {
		ArrayList<String> output = new ArrayList<String>();
		
		for (LocalDate date = LocalDate.of(year, month, day); date.getYear() < year+1; 
			date = date.plusWeeks(1)) {
    		System.out.println("Searching page for songs... " + staticURL + DateTimeFormatter.ISO_DATE.format(date));
    		URLResource currPage = null;
    		try {
        		currPage = new URLResource(staticURL + DateTimeFormatter.ISO_DATE.format(date));
    		} catch (ResourceException re) {
    			//it's fine if edu.duke throws a RE
    		}
    		if (currPage == null) {
    			System.out.println("This page was not found.\n");
    			continue;
    		}
    		
    		String source = currPage.asString();
    		System.out.println("loading...");
    		
    		int start = 0;
    		
    		while (true) {
    			int targetIdx = source.indexOf("Song Hover-", start);
            	if (targetIdx == -1) {
            		break;
            	}
            	int beginning = targetIdx+11;
            	int ending = source.indexOf("\"", beginning);
            	String song = WordUtils.capitalizeFully(source.substring(beginning, ending).trim());
            	output.add(song);
            	
            	start = ending + 1;
    		}
    		System.out.println("Done\n");
		}
		return output;
	}
	
	private ArrayList<String> findArtistNames() {
		ArrayList<String> output = new ArrayList<String>();
		
    	for (LocalDate date = LocalDate.of(year, month, day); date.getYear() < year+1; date = date.plusWeeks(1)) {
    		System.out.println("Searching page for artists... " + staticURL + DateTimeFormatter.ISO_DATE.format(date));
    		
    		URLResource currPage = null;
    		try {
        		currPage = new URLResource(staticURL + DateTimeFormatter.ISO_DATE.format(date));
    		} catch (ResourceException re) {
    			//it's fine if edu.duke throws a RE
    		}
    		if (currPage == null) {
    			System.out.println("This page was not found.\n");
    			continue;
    		}
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
            	output.add(artist);
            	
            	start = ending + 1;
            }
    		
    		System.out.println("Done\n");
    	}
    	return output;
	}
	
	
	private void getRidOfRepeats() {
		if (!(songs.size() == artists.size())) {
			System.out.println("Warning, song list and artist list are NOT the same size");
			return;
		}
		int size = songs.size();
		ArrayList<Integer> idxToRemove = new ArrayList<Integer>();
		//compare first items across whole list
		for (int i = 0; i < size; i++) {
			// get ith indexed elements
			String currSong = songs.get(i);
			String currArtist = artists.get(i);
			// compare them to rest of array lists
			for (int j = i+1; j < size; j++) {
				//get current element starting in front of currSong/currArtist
				String afterCurrSong = songs.get(j);
				String afterCurrArtist = artists.get(j);
				//compare currSong with after song
				if (currSong.equals(afterCurrSong)) {
					//if song titles are the same, check if artist names are the same
					if (currArtist.equals(afterCurrArtist)) {
						//if so, song and title are duplicates and will be marked for deletion
						idxToRemove.add(j);
					}
					//if same song name but different artists, then continue
				}
				//if song does not equal, then continue until end of list
			}
		}
		//make a hashset to get rid of repeated occurrences
		HashSet<Integer> hs = new HashSet<Integer>();
		for (int i = 0; i < idxToRemove.size(); i++) {
			int addToHash = idxToRemove.get(i);
			hs.add(addToHash);
		}
		//make a new array list to store single occurrence indexes
		ArrayList<Integer> idxToRemove2 = new ArrayList<Integer>();
		
		//add values from hash set into idxToRemove2
		for (Integer i : hs) {
			//System.out.println(i);
			idxToRemove2.add(i);
		}
		//sort it from biggest to smallest
		Collections.sort(idxToRemove2);
		Collections.reverse(idxToRemove2);
		
		for (int i = 0; i < idxToRemove2.size(); i++) {
			int byeIdx = idxToRemove2.get(i);
			songs.remove(byeIdx);
			artists.remove(byeIdx);
		}
		System.out.println("\nHash set size: " + hs.size());
	}
	
	
	
	
	
	public void printSongs() {
		System.out.println("\nSongs:\n");
		for (int i = 0; i < songs.size(); i++) {
			//System.out.println((i+1) + ": " + songs.get(i));
			System.out.println(songs.get(i));
		}
		System.out.println("\nFound " + songs.size() + " songs\n");
	}
	
	public void printArtists() {
		System.out.println("\nArtists:\n");
		for (int i = 0; i < artists.size(); i++) {
			//System.out.println((i+1) + ": " + artists.get(i));
			System.out.println(artists.get(i));
		}
		System.out.println("\nFound " + artists.size() + " artists\n");

	}
	

	@Override
	public String toString() {
		printSongs();
		printArtists();
		return "[year=" + year + "\n, URLStart=" + staticURL
				+ "]";
	}
	
	
}
