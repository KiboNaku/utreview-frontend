
require("babel-register")({
	presets: ["es2015", "react"]
});

const router = require("./Routes").default;

const Sitemap = require("react-router-sitemap").default;

var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "ut-review-db.cl2fpl9updu1.us-east-2.rds.amazonaws.com",
	user: "admin",
	password: "if(jG==Yi)momo15<3LuKeRan176",
	port: "3306"
});

var professors = []
var courses = []

connection.connect(function (err) {
	if (err) {
		console.error('Database connection failed: ' + err.stack);
		connection.end();
		return;
	}
	console.log('Connected to database.');
	connection.query("SELECT first_name, last_name FROM ut_review.prof;", function (err, result, fields) {
		if (err) throw err;

		result.forEach((item) => {
			const firstName = item.first_name
			const lastName = item.last_name
			const profPath = firstName.toLowerCase().replace(" ", "") + "_" + lastName.toLowerCase().replace(" ", "")
			professors.push({ profId: profPath })
		})

		console.log("Finished professor query: number of results= " + professors.length.toString() + ".")
		connection.query("SELECT num, topic_num, d.abr FROM ut_review.course c INNER JOIN ut_review.dept d on d.id = c.dept_id;", function (err, result, fields) {
			if (err) throw err;

			result.forEach((item) => {

				let coursePath = item.abr.toLowerCase().replace(' ', '') + "_" + item.num.toLowerCase()
				if (item.topic_num >= 0) {
					coursePath += "_" + item.topic_num.toString()
				}

				courses.push({ courseId: coursePath })
			})

			console.log("Finished course query: number of results= " + courses.length.toString() + ".")
			generateSitemap()
			connection.end()
		});
	});

});

function generateSitemap() {

	console.log("Generating sitemap.")

	const paramsConfig = {
		"/course-results/:courseId": courses,
		"/prof-results/:profId": professors
	};
	return (
		new Sitemap(router)
			.applyParams(paramsConfig)
			.build("https://utexasreview.com")
			.save("./public/sitemap.xml")
	);
}