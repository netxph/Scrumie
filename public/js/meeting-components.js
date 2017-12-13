class MeetingBox extends React.Component {

    render() {
        return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm" id="col-sm-meeting">
                            <form>
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
                <div className="col-sm"></div>
            </div>
        </div>
        );
    }
}
