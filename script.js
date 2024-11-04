$(document).ready(function() {  
  let listMode = false;  

  $("#add-row").on("click", function() {  
      const fio = $("#fio").val();  
      const age = $("#age").val();  
      if (fio && age) {  
          const rowCount = $("#data-table tbody tr").length + 1; // Считаем номера строк  
          const newRow = `<tr>  
              <td>${rowCount}</td>  
              <td>${fio}</td>  
              <td>${age}</td>  
              <td><button class='delete-row'>Удалить</button></td>  
          </tr>`;  
          $("#data-table tbody").append(newRow);  
          $("#fio").val('');  
          $("#age").val('');  
      }  
  });  

  // Общий обработчик для удаления строк таблицы  
  $("#data-table").on("click", ".delete-row", function() {  
      const row = $(this).closest('tr');  
      if (confirm("Вы уверены, что хотите удалить эту строку?")) {  
          row.remove();  
          reindexTable();  
      }  
  });  

  // Функция для переиндексации строк  
  function reindexTable() {  
      $("#data-table tbody tr").each(function(index) {  
          $(this).find('td:first').text(index + 1);  
      });  
  }  

  $("#toggle-list").on("click", function() {  
      listMode = !listMode;  
      if (listMode) {  
          // Превращаем таблицу в список  
          const listContent = $("<ul></ul>");  

          $("#data-table tbody tr").each(function() {  
              const li = $("<li></li>");  
              li.text($(this).find("td:nth-child(2)").text() + " (" + $(this).find("td:nth-child(3)").text() + ")");  
              listContent.append(li);  
          });  

          $("#data-table").replaceWith(listContent);  
      } else {  
          // Превращаем список обратно в таблицу  
          const table = $("<table><thead><tr><th>Номер</th><th>ФИО</th><th>Возраст</th><th>Действия</th></tr></thead><tbody></tbody></table>");  

          $("ul li").each(function(index) {  
              const parts = $(this).text().split(" (");  
              const name = parts[0];  
              const age = parts[1].replace(")", "");  
              const newRow = `<tr>  
                  <td>${index + 1}</td>  
                  <td>${name}</td>  
                  <td>${age}</td>  
                  <td><button class='delete-row'>Удалить</button></td>  
              </tr>`;  
              table.find("tbody").append(newRow);  
          });  

          $("ul").replaceWith(table);  
      }  
  });  

  // Обработка события для небольших блоков  
  $(".small-block").on("click", function(e) {  
      e.stopPropagation();  
      $(this).toggleClass("selected");  
  });  

  // Перемещение выделенных блоков  
  $(".big-div").on("click", function() {  
      const parent = $(this);  
      $(".small-block.selected").each(function() {  
          $(this).detach().appendTo(parent);  
      });  
  });  
});