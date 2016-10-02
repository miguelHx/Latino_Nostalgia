package code;

/**
 * Prints out all links within the HTML source of a web page.
 * 
 * @author Duke Software Team 
 */
import edu.duke.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;

public class URLFinder {
    public static StorageResource findURLs(String url) {
        URLResource page = new URLResource(url);
        String source = page.asString();
        StorageResource storeURL = new StorageResource();
        int start = 0;
        while (true) {
            int index = source.indexOf("href=", start);
            if (index == -1) {
                break;
            }
            int firstQuote = index+6; // after href="
            int endQuote = source.indexOf("\"", firstQuote);
            String sub = source.substring(firstQuote, endQuote);
            if (sub.startsWith("http") && sub.contains(".com")) { //change http to https when needed
                //also change to if sub.endswith(".com") || sub.endswith(".com/")
                storeURL.add(sub);
            }
            start = endQuote + 1;
        }
        return storeURL;
    }
    public static int findDOTs(StorageResource sr) {
        
        int start = 0;
        int dotAmount = 0;
        for (String link : sr.data()) {
            while (true) {
                int index = link.indexOf(".", start);
                if (index == -1) {
                    break;
                }
                dotAmount += 1;
                start = index + 1;
            }
        }
        return dotAmount;
    }
    

    public static void testURLWithStorage() {
        StorageResource s2 = findURLs("http://thenostalgiamachine.com/index.html");
        for (String link : s2.data()) {
            System.out.println(link);
        }
        
        System.out.println("size = " + s2.size());
        System.out.println("Dots: " + findDOTs(s2));
    }
    
    public static void main(String args[]) throws ParseException {
    	//testURLWithStorage();
    	/*
    	String song = "VIVIR SIN AIRE";
    	System.out.println("Before: " + song);
    	String result = WordUtils.capitalizeFully(song);
    	System.out.println("After: " + result);
    	*/
    	/*
    	Calendar cal = Calendar.getInstance();
    	cal.clear();
    	cal.set(1986,  8, 20);
    	int year = cal.get(Calendar.YEAR);
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    	while (year >= cal.get(Calendar.YEAR)) {
    		System.out.println(sdf.format(cal.getTime()));
    		cal.add(Calendar.DAY_OF_MONTH, 7);
    	}
    	*/
    	
    	for(LocalDate date = LocalDate.of(1986, 9, 20);
    	        date.getYear() < 1987;
    	        date = date.plusWeeks(1)) {
    	    System.out.println(DateTimeFormatter.ISO_DATE.format(date));
    	}
    }
    
}


/*
 * Q: Need help in modifying while loop that utilizes Calendar (Java)
 * 
 * The code below does what I want except for the very last output.

    Calendar cal = Calendar.getInstance();
    	cal.clear();
    	cal.set(2005,  1, 22);
    	int year = cal.get(Calendar.YEAR);
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    	while (year >= cal.get(Calendar.YEAR)) {
    		cal.add(Calendar.DAY_OF_MONTH, 7);
    		System.out.println(sdf.format(cal.getTime()));
    	}

Here is the output:

    1986-09-27
    1986-10-04
    1986-10-11
    1986-10-18
    1986-10-25
    1986-11-01
    1986-11-08
    1986-11-15
    1986-11-22
    1986-11-29
    1986-12-06
    1986-12-13
    1986-12-20
    1986-12-27
    1987-01-03

I'm going to use this while loop to execute irreversible code and I want it to be when the year is NOT 1987.  However, the 1987 shows up here and I've tried modifying the while loop condition to get the last entry to be 

1986-12-27

but to no avail and I got an infinite loop on one of my attempts that made my computer really slow, so I'm pretty stuck.

The desired output is the same as the output above except without the 1987 date.

 */








