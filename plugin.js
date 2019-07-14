/* eslint-disable */
!(function() {
  "use strict";
  const global = tinymce.util.Tools.resolve("tinymce.PluginManager");
  global.add("quick_insert_resource", function(editor) {
    editor.on("init", function() {
      editor.ui.registry.addIcon(
        "quick_insert_resource",
        `
        <svg t="1563070372451" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3033" width="16" height="16"><path d="M164.6 147a87.6 87.6 0 1 0 87.6 87.6 87.7 87.7 0 0 0-87.6-87.6z" fill="#F9DB91" p-id="3034"></path><path d="M358.81 173.43l588.19 0 0 122.25-588.19 0 0-122.25Z" fill="#F9DB91" p-id="3035"></path><path d="M164.6 424.4a87.6 87.6 0 1 0 87.6 87.6 87.7 87.7 0 0 0-87.6-87.6z" fill="#AEF0FF" p-id="3036"></path><path d="M358.81 450.87l588.19 0 0 122.25-588.19 0 0-122.25Z" fill="#AEF0FF" p-id="3037"></path><path d="M164.6 701.85a87.6 87.6 0 1 0 87.6 87.6 87.7 87.7 0 0 0-87.6-87.6z" fill="#EF6A6A" p-id="3038"></path><path d="M358.81 728.32l588.19 0 0 122.25-588.19 0 0-122.25Z" fill="#EF6A6A" p-id="3039"></path><path d="M164.6 134a100.6 100.6 0 1 0 100.6 100.6A100.6 100.6 0 0 0 164.6 134z m0 175.2a74.6 74.6 0 1 1 74.6-74.6 74.69 74.69 0 0 1-74.6 74.55zM930 160.43H375.81a30.09 30.09 0 0 0-30 30v88.25a30.09 30.09 0 0 0 30 30H930a30.09 30.09 0 0 0 30-30v-88.25a30.09 30.09 0 0 0-30-30z m4 118.25a4.1 4.1 0 0 1-4 4H375.81a4.1 4.1 0 0 1-4-4v-88.25a4.1 4.1 0 0 1 4-4H930a4.1 4.1 0 0 1 4 4zM164.6 411.4A100.6 100.6 0 1 0 265.2 512a100.6 100.6 0 0 0-100.6-100.6z m0 175.2a74.6 74.6 0 1 1 74.6-74.6 74.69 74.69 0 0 1-74.6 74.6zM930 437.87H375.81a30.09 30.09 0 0 0-30 30v88.25a30.09 30.09 0 0 0 30 30H930a30.09 30.09 0 0 0 30-30v-88.25a30.09 30.09 0 0 0-30-30z m4 118.25a4.1 4.1 0 0 1-4 4H375.81a4.1 4.1 0 0 1-4-4v-88.25a4.1 4.1 0 0 1 4-4H930a4.1 4.1 0 0 1 4 4zM164.6 688.85a100.6 100.6 0 1 0 100.6 100.6 100.6 100.6 0 0 0-100.6-100.6z m0 175.2a74.6 74.6 0 1 1 74.6-74.6A74.69 74.69 0 0 1 164.6 864zM930 715.32H375.81a30.09 30.09 0 0 0-30 30v88.25a30.09 30.09 0 0 0 30 30H930a30.09 30.09 0 0 0 30-30v-88.25a30.09 30.09 0 0 0-30-30z m4 118.25a4.1 4.1 0 0 1-4 4H375.81a4.1 4.1 0 0 1-4-4v-88.25a4.1 4.1 0 0 1 4-4H930a4.1 4.1 0 0 1 4 4z" fill="#512C56" p-id="3040"></path></svg>
        `
      );
    });

    var initButton = function() {
      $("#next-page-button").click(function(e) {
        offset = offset + 20;
        console.log(offset);
        var listurl =
          "/api/v1/books/" +
          $("#book").val() +
          "/resources?&sort=seq&order=asc&offset=" +
          offset;
        $.getJSON(listurl, function(data, textStatus, jqXHR) {
          var arr = [];
          data.rows.forEach(item => {
            arr.push({
              type: "checkbox",
              name: "<a href=" + item.url + ">" + item.title + "</a>",
              label: item.seq + " " + item.title,
              value: item.url
            });
          });
          openDialog(arr);
        });
      });
      $("#pre-page-button").click(function(e) {
        offset = offset - 20;
        var listurl =
          "/api/v1/books/" +
          $("#book").val() +
          "/resources?sort=seq&order=asc&offset=" +
          offset;
        $.getJSON(listurl, function(data, textStatus, jqXHR) {
          var arr = [];
          data.rows.forEach(item => {
            arr.push({
              type: "checkbox",
              name: "<a href=" + item.url + ">" + item.title + "</a>",
              label: item.seq + " " + item.title,
              value: item.url
            });
          });
          openDialog(arr);
        });
      });
    };

    var openDialog = function(body) {
      var page2Config = {
        title: "快速插入本书资源索引",
        body: {
          type: "panel",
          items: body
        },
        buttons: [
          {
            type: "custom",
            name: "pre-page",
            text: "前一页",
            disabled: false
          },

          {
            type: "custom",
            name: "next-page",
            text: "下一页",
            disabled: false
          },
          {
            type: "custom",
            name: "insert",
            text: "插入",
            disabled: false
          }
        ],

        onAction: (dialogApi, details) => {
          if (details.name === "pre-page") {
            offset = offset - 20;
            var listurl =
              "/api/v1/books/" +
              $("#book").val() +
              "/resources?sort=seq&order=asc&offset=" +
              offset;
            $.getJSON(listurl, function(data, textStatus, jqXHR) {
              var arr = [];
              data.rows.forEach(item => {
                arr.push({
                  type: "checkbox",
                  name: "<a href=" + item.url + ">" + item.title + "</a>",
                  label: item.seq + " " + item.title,
                  value: item.url
                });
              });
              dialogApi.redial(openDialog(arr));
            });
          }
          if (details.name === "next-page") {
            offset = offset + 20;
            var listurl =
              "/api/v1/books/" +
              $("#book").val() +
              "/resources?sort=seq&order=asc&offset=" +
              offset;
            $.getJSON(listurl, function(data, textStatus, jqXHR) {
              var arr = [];
              data.rows.forEach(item => {
                arr.push({
                  type: "checkbox",
                  name:
                    "<a href=" + item.absoluteURL + ">" + item.title + "</a>",
                  label: item.seq + " " + item.title,
                  value: item.absoluteURL
                });
              });
              dialogApi.redial(openDialog(arr));
            });
          }

          if (details.name === "insert") {
            var data = dialogApi.getData();
            for (var i in data) {
              if (data[i] === true) {
                tinymce.activeEditor.execCommand(
                  "mceInsertContent",
                  false,
                  "<p>" + i + "</p>"
                );
              }
            }
            dialogApi.close();
          }
        }
      };

      return page2Config;
    };

    var offset = 0;

    editor.ui.registry.addButton("quick_insert_resource", {
      tooltip: "插入资源列表",
      icon: "quick_insert_resource",
      onAction: function() {
        var listurl =
          "/api/v1/books/" +
          $("#book").val() +
          "/resources?sort=seq&order=asc&offset=" +
          offset;
        $.getJSON(listurl, function(data, textStatus, jqXHR) {
          var arr = [];
          data.rows.forEach(item => {
            arr.push({
              type: "checkbox",
              name: "<a href=" + item.absoluteURL + ">" + item.title + "</a>",
              label: item.seq + " " + item.title,
              value: item.absoluteURL
            });
          });
          editor.windowManager.open(openDialog(arr));
        });
      }
    });
  });
})();
