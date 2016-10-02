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

    // ignore below, I was just testing a calendar iterator
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








