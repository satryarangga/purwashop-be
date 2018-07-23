var express = require('express');
var router = express.Router();

const data = [
	{
		title:"Belajar PHP",
		image:"https://www.duniailkom.com/wp-content/uploads/2016/03/cover_ebook_php_uncover.jpg"
	},
	{
		title:"Belajar HTML",
		image:"https://www.duniailkom.com/wp-content/uploads/2015/05/cover_ebook_html_uncover.jpg"
	},
	{
		title:"Belajar CSS",
		image:"https://www.duniailkom.com/wp-content/uploads/2015/09/cover_ebook_css_uncover.jpg"
	},
	{
		title:"Belajar Javascript",
		image:"https://www.duniailkom.com/wp-content/uploads/2017/02/JavaScript-Uncover-cover.jpg"
	},
	{
		title:"Belajar Node JS",
		image:"/products/buku1.jpg"
	},
	{
		title:"Belajar MYSQL",
		image:"https://www.duniailkom.com/wp-content/uploads/2017/12/MySQL-Uncover.jpg"
	},
];

router.get("/", function(request, response) {
	response.send(data);
});

module.exports = router;

