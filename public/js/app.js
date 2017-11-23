$(document).ready(() => {
    $.get("/api/meeting")
        .done(function(data) {
            console.log(data);

            let container = $("#main");

            for(let meeting of data) {
                //header
                let header = $("<h2 />");
                header.text(`[${meeting.project}] ${meeting.name}`);

                container.append(header);

                //content
                let table = $("<table />");

                let yesterday = $("<tr />");
                yesterday.append($("<td />").text("Yesterday"));
                yesterday.append($("<td />").text(meeting.yesterday));

                table.append(yesterday);

                let today = $("<tr />");
                today.append($("<td />").text("Today"));
                today.append($("<td />").text(meeting.today));

                table.append(today);

                let impediment = $("<tr />");
                impediment.append($("<td />").text("Impediment"));
                impediment.append($("<td />").text(meeting.impediment));

                table.append(impediment);

                container.append(table);
            }

        });

    $("#new-meeting").submit((e) => {
        e.preventDefault();
        $(this).prop("disable", true);

        let data = $("#new-meeting").serialize();

        $.post("/api/meeting", data)
            .done((data) => {
                $(this).prop("disable", false);
            });
    });
});

