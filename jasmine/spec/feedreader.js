/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
	describe("RSS Feeds", function() {
		/* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
		it("are defined", function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		it("URL is defined", function() {

			for (var i in allFeeds) {
				expect(allFeeds[i].url).toBeDefined();  //URL is defined
				expect(allFeeds[i].url).not.toBe(null); //URL is not empty
			}
		});

		/* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		it("Name is defined", function() {

			for (var i in allFeeds) {
				expect(allFeeds[i].name).toBeDefined();  //Name is defined
				expect(allFeeds[i].name).not.toBe(null); //Name is not empty
			}

		});
	});


	/* Test suite named "The menu" */
	describe("The menu", function() {
		let menuIcon = $(".menu-icon-link");
        	/* This is a test that ensures the menu element is
             * hidden by default.
             */
		it("is hidden", function() {
			expect(document.body.classList.contains("menu-hidden")).toBe(true); //Class set on start-up
		});

		/* This is a test that ensures the menu changes
             * visibility when the menu icon is clicked.
             */
		 it("toggles", function() {
			menuIcon.click();
			expect(document.body.classList.contains("menu-hidden")).toBe(false); //Class is toggled off showing the menu
			menuIcon.click();
			expect(document.body.classList.contains("menu-hidden")).toBe(true); //Class is toggled off showing the menu
		 });

	});




	/* Test suite named "Initial Entries" */
	describe("Initial Entries", function() {
		/* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.s
         */
		beforeEach(function(done) {
			loadFeed(0, done);

		});

		it("Initial entries loaded", function() {
			expect($(".feed .entry").length).toBeGreaterThan(0);
		});
	});


	/* Test suite named "New Feed Selection" */
	describe("New Feed Selection", function() {
		let  prevEntry;
		let  nextEntry;
		/* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
		beforeEach(function(done){
			loadFeed(0, function(){
				prevEntry = $(".feed").html();
				loadFeed(1, function(){
					nextEntry = $(".feed").html();

					done();
				});
			});
		});


		it("The feed changes when loaded", function() {
			expect(prevEntry).not.toBe(nextEntry);
		});
	});

}());
