class ScrumBox extends React.Component {

    constructor() {
        super();

        this.state = {
            meetings: []
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
            console.log(res);
        }).fail((xhr) => {
            console.log(xhr.status);
        });
    }

    render() {
        if(!sessionStorage.getItem("token")) {
            return (
                <Redirect to="/session/new" />
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
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    +New
                </button>
        </form>

                </div>
            </div>
        <div className="row">
            <div className="col-sm">
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">New Note</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={this._handleSubmit.bind(this)}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" ref={(input) => this._name = input} className="form-control" id="name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="project">Project</label>
                                        <input type="text" ref={(input) => this._project = input} className="form-control" id="project" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="yesterday">Yesterday</label>
                                        <textarea ref={(textarea) => this._yesterday = textarea} className="form-control" id="yesterday" rows="3"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="today">Today</label>
                                        <textarea ref={(textarea) => this._today = textarea} className="form-control" id="today" rows="3"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="impediment">Impediment</label>
                                        <textarea ref={(textarea) => this._impediment = textarea} className="form-control" id="impediment" rows="3"></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <input type="submit" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
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

    _handleSubmit(e) {
        e.preventDefault();

        let meeting = {
            name: this._name.value,
            project: this._project.value,
            yesterday: this._yesterday.value,
            today: this._today.value,
            impediment: this._impediment.value
        }

        console.log(meeting);

    }
}

class MeetingList extends React.Component {

    render() {
        let meetings = this._getMeetings();

        return(
            meetings.map((meeting) => 
                    <MeetingCard 
                        key={meeting._id}
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

    render() {
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
                            <a href="#" className="card-link">Edit</a>
                            <a href="#" className="card-link">Delete</a>
                        </div>
                    </div>
        );
    }

}
