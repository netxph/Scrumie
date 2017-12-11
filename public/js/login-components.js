class LoginBox extends React.Component {
    
    render() {
        return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm" id="col-sm-login">
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">User ID</label>
                            <input type="text" className="form-control" id="name" placeholder="Enter user ID" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="col-sm"></div>
            </div>
        </div>

        );
    }
}
