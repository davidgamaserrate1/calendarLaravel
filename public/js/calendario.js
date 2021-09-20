  document.addEventListener('DOMContentLoaded', function() {

      let formulario = document.querySelector("form");

      var calendarEl = document.getElementById('calendario');

      var calendar = new FullCalendar.Calendar(calendarEl, {

          initialView: 'dayGridMonth',
          locale: "pt-br",

          headerToolbar: {
              left: 'prev,next,today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,listWeek',


          },
          events: "http://localhost/calendario/public/evento/mostrar",

          dateClick: function(info) {
              formulario.reset();
              formulario.start.value = info.dateStr;
              formulario.end.value = info.dateStr;
              $("#evento").modal("show");
          },
          eventClick: function(info) {

              var evento = info.event;
              //console.log(evento);
              axios.post("http://localhost/calendario/public/evento/editar/" + info.event.id).then(
                  (resposta) => {
                      formulario.id.value = resposta.data.id;

                      $("#evento").modal("show");
                      //console.log('opa');

                  }
              ).catch(
                  error => {
                      if (error.response) {

                          console.log(error.response.data);
                      }

                  }
              )
          }


      });


      calendar.render();


      document.getElementById("btnSalvar").addEventListener("click", function() {
          const dados = new FormData(formulario);


          axios.post("http://localhost/calendario/public/evento/adicionar", dados).then(
              (resposta) => {

                  calendar.refetchEvents();
                  $("#evento").modal("hide");
                  //console.log('opa');

              }
          ).catch(
              error => {
                  if (error.response) {
                      // console.log('opa2');

                      console.log(error.response.data);
                  }

              }
          )

          //  if (document.getElementById("start") !== null)
          //      console.log(formulario);




      });
  });
