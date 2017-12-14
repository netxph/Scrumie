const Router = window.ReactRouterDOM.HashRouter;
const Route =  window.ReactRouterDOM.Route;
const Link =  window.ReactRouterDOM.Link;
const Prompt =  window.ReactRouterDOM.Prompt;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;
const hashHistory = window.ReactRouterDOM.hashHistory;

class AppBox extends React.Component {

    render() {
        return (
        <Router>
            <div>
            <nav className="navbar navbar-light bg-light justify-content-between">
                <a className="navbar-brand">Scrumie</a>
            </nav>
            <div id="content">
                <Route exact path="/meeting/new" component={MeetingNewBox} />
                <Route exact path="/session/new" component={LoginBox} />
                <Route exact path="/meetings/:meetingId" component={MeetingEditBox} />
                <Route exact path="/" component={ScrumBox} />
            </div>
                    <hr />
        <footer className="footer">
            <p>(c) Scrumie 2017</p>
        </footer>
            </div>
      </Router>            

        );
    }
}
const Login = () => <LoginBox />
const Home = () => <ScrumBox />
const MeetingNew = () => <MeetingNewBox />
const MeetingEdit = () => <MeetingEditBox />

ReactDOM.render(<AppBox />, document.getElementById("root"));
