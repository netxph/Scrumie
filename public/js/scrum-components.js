class ScrumBox extends React.Component {

    constructor() {
        super();

        this.state = {
            meetings: [],
            editMode: false,
            auth: true
        }
    }

    componentWillMount() {

        $.ajax({
            type: "GET",
            url: "/api/meeting",
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        }).done((meetings, status, xhr) => {
            this.setState({ meetings });
            console.log(meetings);
        }).fail((xhr) => {
            console.log(xhr.status);

            if(xhr.status == 401) {
                this.setState({
                    auth: false
                });
            }
        });

        if(!sessionStorage.getItem("token")) {
            this.setState({
                auth: false
            });
        }
    }

    render() {
        if(!this.state.auth) {
            return (
                <Redirect to="/session/new" />
            );
        }

        if(this.state.editMode) {
            return (
                <Redirect to="/meeting/new" />
            );
        }

        return (
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm">
            <form className="form-inline float-right">
            <select className="form-control mr-sm-2">
                <option>Team Rocket</option>
                <option>Team Crystal</option>
            </select>
            <select className="form-control mr-sm-2">
                <option>December 2017</option>
                <option>November 2017</option>
            </select>
            <select className="form-control mr-sm-2">
                <option>1</option>
                <option>2</option>
            </select>
            <button className="btn btn-outline-success my-2 my-sm-0 mr-sm-2" type="submit">View</button>
                <button type="button" onClick={this._handleClick.bind(this)} className="btn btn-primary">
                    +New
                </button>
        </form>

                </div>
            </div>
        <div className="row">
            <div className="col-sm">
                <div className="card-deck">
                    <MeetingList meetings={this.state.meetings} />
                </div> 
            </div>
        </div>
</div>
        );
    }

    _handleClick(e) {
        e.preventDefault();

        this.setState({
            editMode: true
        });
    }
}

class MeetingList extends React.Component {

    render() {
        let meetings = this._getMeetings();

        return(
            meetings.map((meeting) => 
                    <MeetingCard 
                        key={meeting._id}
                        meetingId={meeting._id}
                        name={meeting.name}
                        yesterday={meeting.yesterday}
                        today={meeting.today}
                        impediment={meeting.impediment} />
                )
        );
    }

    _getMeetings() {
        return this.props.meetings;
    }
}

class MeetingCard extends React.Component {

    constructor() {
        super();

        this.state = {
            refresh: false,
            edit: ""
        }
    }

    render() {

        if(this.state.edit != "") {
            return (
                <Redirect to={`/meeting/${this.state.edit}`} />
            );
        }

        if(this.state.refresh) {
            return (                
                <Redirect to="/" />
            );
        }

        return(
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">{this.props.name}</h4>
                            <h6 className="card-subtitle mb-2 text-muted">Yesterday</h6>
                            <p className="card-text">{this.props.yesterday}</p>
                            <h6 className="card-subtitle mb-2 text-muted">Today</h6>
                            <p className="card-text">{this.props.today}</p>
                            <h6 className="card-subtitle mb-2 text-muted">Impediments</h6>
                            <p className="card-text">{this.props.impediment}</p>
                            <ManageButton meetingId={this.props.meetingId} action={this._handleEdit.bind(this)} text="Edit" />
                            <ManageButton meetingId={this.props.meetingId} action={this._handleDelete.bind(this)} text="Delete" />
                        </div>
                    </div>
        );
    }

    _handleEdit(meetingId) {
        console.log(meetingId);

        this.setState({
            edit: meetingId
        });
    }

    _handleDelete(meetingId) {
        console.log(meetingId);

        $.ajax({
            type: "DELETE",
            url: `/api/meeting/${meetingId}`,
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        }).done((res, status, xhr) => {
            this.setState({
                refresh: true
            });
        }).fail((xhr) => {
            console.log(xhr.status);
        });
    }

}

class ManageButton extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <a href="#" onClick={this._handleEdit.bind(this)} className="card-link">{this.props.text}</a>
        );
    }

    _handleEdit(e) {
        e.preventDefault();
        this.props.action(this.props.meetingId);
    }

}
