class ScrumBox extends React.Component {

    render() {
        return(
            <div>
                <h1>Scrum Meeting</h1>
                <MeetingForm />                        
                <MeetingList />
            </div>
        );
    }
}

class MeetingForm extends React.Component {

    constructor() {
        super();

        this.state = {
            message: ""
        }
    }
    
    render() {

        return(
<form>
        <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
        </div>
        <div>
            <label htmlFor="project">Project</label>
            <input type="text" id="project" />
        </div>
        <div>
            <label htmlFor="yesterday">Yesterday</label><br/>
            <textarea id="yesterday" name="yesterday" />
        </div>
        <div>
            <label htmlFor="today">Today</label><br/>
            <textarea id="today" />
        </div>
        <div>
            <label htmlFor="impediment">Impediment</label><br/>
            <textarea id="impediment" />
        </div>
            <div><input type="submit" onClick={this._handleClick.bind(this)} /></div>
        <p>{this.state.message}</p>

    </form>

        );
    }

    _handleClick(e) {
        e.preventDefault();

        this.setState({
            message: "Item added."
        });
    }
}

class MeetingList extends React.Component {

    constructor() {
        super();

        this.state = {
            meetings: [
            {
                id: 1,
                name: "Marc Vitalis",
                project: "Scrumie",
                yesterday: "... is history",
                today: "... is present",
                impediment: "... is a mystery"
            },
            {
                id: 2,
                name: "Jan Lloyd Cruz",
                project: "Scrumie",
                yesterday: "... is doing",
                today: "... is done",
                impediment: "... is blocking"
            }
            ]
        };
    }

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
        return this.state.meetings; 
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
