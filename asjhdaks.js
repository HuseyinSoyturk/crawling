const request = require("request");
const $ = require("cheerio");
const fs = require("fs");

getLinks = async () => {
  request(
    {
      uri: "https://tipnotlari.wordpress.com/adli-tip/"
    },
    async (err, res, body) => {
      let links = [];
      let pElements = $("#header-menu a", body);
      pElements.each(function(i, elem) {
        links[i] = $(this)[0].attribs.href;
      });
      for (const link of links) {
        await new Promise(resolve => setTimeout(resolve , 3000));
        getWithLink(link);
      }
    }
  );
};

function getWithLink(link) {
  request(
    {
      uri: link
    },
    (err, res, body) => {
      let url = link.slice(33).split("/");
      let fileName = url[url.length - 2];
      let folderArray = [];
      let root = ["html-files/"];
      let url_folder = url.slice(0, url.length - 2);
      folderArray = root.concat(url_folder);
      let folderDir;
      for (let i = 0; i < folderArray.length; i++) {
        folderDir = "";
        for (let j = 0; j <= i; j++) {
          folderDir = folderDir + folderArray[j] + "/";
        }
        if (!fs.existsSync(folderDir)) {
          fs.mkdirSync(folderDir);
        }
      }
      let pElements = $(".entry-content", body);
      pElements.remove('div');
      fs.writeFile(
        "C:/Users/husey/Desktop/Yeni klasör/" + folderDir + fileName + ".html",
        pElements.html(),
        function(err) {
          if (err) {
            return console.log(err);
          }
        }
      );
    }
  );
}

// getLinks();

getWithLink('https://tipnotlari.wordpress.com/adli-tip/')

