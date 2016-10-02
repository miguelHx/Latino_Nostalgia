package code;

public class Runner {

	public static void main(String[] args) {
		//input starting year, month, and day in parameter below
		//make sure that the day is valid by checking the page
		//on the billboard website.
		//ex: http://www.billboard.com/charts/latin-songs/1987-01-03
		BillboardInfoByWeeklyNavigation year = new BillboardInfoByWeeklyNavigation(2015, 1, 03);
		System.out.println(year);
	}

}
