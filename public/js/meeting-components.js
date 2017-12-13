class MeetingEditBox extends React.Component {

    render() {

        return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm" id="col-sm-meeting">
                            <form onSubmit={this._handleSubmit.bind(this)}>
                                <div className="modal-body">
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
                                    <button type="button" onClick={this._handleClose.bind(this)} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <input type="submit" className="btn btn-primary" />
                                </div>
                            </form>
                </div>
                <div className="col-sm"></div>
            </div>
        </div>
        );
    }

    _handleSubmit(e) {
        e.preventDefault();

    }

    _handleClose(e) {
        e.preventDefault();
    }
}

class MeetingNewBox extends React.Component {

    constructor() {
        super();
        
        this.state = {
            done: false,
            auth: true
        }
    }

    componentWillMount() {
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

        if(this.state.done) {
            return (
                <Redirect to="/" />
            );
        }

        return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm" id="col-sm-meeting">
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
                                    <button type="button" onClick={this._handleClose.bind(this)} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <input type="submit" className="btn btn-primary" />
                                </div>
                            </form>
                </div>
                <div className="col-sm"></div>
            </div>
        </div>
        );
    }

    _handleClose(e) {
        e.preventDefault(e);

        this._close();
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

        $.ajax({
            type: "POST",
            url: "/api/meeting",
            headers: {
                "Authorization": sessionStorage.getItem("token")
            },
            data: meeting
        }).done((meeting, status, xhr) => {
            console.log(meeting);
            this._close();
        }).fail((xhr) => {
            console.log(xhr.status);
        });


    }

    _close() {

        this.setState({
            done: true
        });
    }
}
