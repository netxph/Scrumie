class ScrumBox extends React.Component {

    constructor() {
        super();

        this.state = {
            meetings: []
        };
    }

    componentWillMount() {
        this._getMeetings();
    }

    render() {
        return(
            <div>
                <h1>Scrum Meeting</h1>
                <MeetingForm addMeeting={this._addComment.bind(this)} />                        
                <MeetingList meetings={this.state.meetings} />
            </div>
        );
    }

    _getMeetings() {
        $.ajax({
            url: "/api/meeting",
            method: "GET",
            headers: {
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmV0eHBoIiwiYWNjZXNzIjoibWVldGluZ19jcmVhdGUsbWVldGluZ19lZGl0LG1lZXRpbmdfdmlldyIsImlhdCI6MTUxMjY0NDEyNSwiZXhwIjoxNTEyNjQ1NTY1fQ._QHq5zHggg6-4xBUwF1PtsM4xBA1g7zKVwZbV--kxnE",
                "Content-Type": "application/json"
            },
            success: (meetings) => {
                this.setState({
                    meetings
                });
            }
        });
    }

    _addComment(meeting) {
        meeting.id = this.state.meetings.length + 1; 

        this.setState({
            meetings: this.state.meetings.concat([meeting]) });
    }
}

class MeetingForm extends React.Component {

    constructor() {
        super();

        this.state = {
            message: ""
        };
    }

    render() {

        return(
<form onSubmit={this._handleSubmit.bind(this)} id="meeting-form">
        <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" ref={(input) => this._name = input} />
        </div>
        <div>
            <label htmlFor="project">Project</label>
            <input type="text" id="project" ref={(input) => this._project = input} />
        </div>
        <div>
            <label htmlFor="yesterday">Yesterday</label><br/>
            <textarea id="yesterday" ref={(textarea) => this._yesterday = textarea }/>
        </div>
        <div>
            <label htmlFor="today">Today</label><br/>
            <textarea id="today" ref={(textarea) => this._today = textarea } />
        </div>
        <div>
            <label htmlFor="impediment">Impediment</label><br/>
            <textarea id="impediment" ref={(textarea) => this._impediment = textarea } />
        </div>
            <div><input type="submit"/></div>
            <p>{this.state.message}</p>
    </form>

        );
    }

    _handleSubmit(e) {
        e.preventDefault();

        let meeting = {
            name: this._name.value,
            project: this._project.value,
            yesterday: this._yesterday.value,
            today: this._today.value,
            impediment: this._impediment.value
        };

        this.props.addMeeting(meeting);
        document.getElementById("meeting-form").reset();

        this.setState({
            message: "Item added."
        });
    }
}

class MeetingList extends React.Component {

    render() {
        const meetings = this._getMeetings();

        return(
            <div>
                {meetings.map(meeting => 
                <Meeting 
                    name={meeting.name}
                    project={meeting.project}
                    yesterday={meeting.yesterday}
                    today={meeting.today}
                    impediment={meeting.impediment}
                    key={meeting.id}/>
                )}
            </div>
        );
    }

    _getMeetings() {
        return this.props.meetings;
    }
}

class Meeting extends React.Component {

    render() {
       return(
<table>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{this.props.name}</td>
                    </tr>
                    <tr>
                        <td>Project</td>
                        <td>{this.props.project}</td>
                    </tr>
                    <tr>
                        <td>Yesterday</td>
                        <td>{this.props.yesterday}</td>
                    </tr>
                    <tr>
                        <td>Today</td>
                        <td>{this.props.today}</td>
                    </tr>
                    <tr>
                        <td>Impediment</td>
                        <td>{this.props.impediment}</td>
                    </tr>
                </tbody>
                </table>
       );           
    }
}

ReactDOM.render( <ScrumBox />, document.getElementById("root"));
