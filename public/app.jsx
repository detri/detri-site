class Nav extends React.Component {
    render() {
        return (<nav className="navbar navbar-expand-md bg-dark">
            <div className="container">
                <a className="navbar-brand text-light" href="/">
                    ded.zone
                        </a>
                <ul className="navbar-nav">
                    <NavItem name="Home" href="/" />
                    <NavItem name="Music" href="/music" />
                    <NavItem name="Users" href="/users" />
                    <NavItem name="About" href="/about" />
                </ul>
            </div>
        </nav>);
    }
}

class NavItem extends React.Component {
    render() {
        return (<li className="nav-item">
            <a className="nav-link" href={this.props.href}>
                {this.props.name}
            </a>
        </li>);
    }
}

class Layout extends React.Component {
    render() {
        return (<div id="body">
            <Nav />
            <div className="container-fluid" id="main-content">
                <div className="container">
                    <LatestSong />
                </div>
            </div>
            <Footer />
        </div>);
    }
}

class LatestSong extends React.Component {
    state = {
        songpath: "default"
    };
    componentWillMount() {
        fetch("/api/songs/latest").then(result => {
            result.json().then(res => {
                console.log(res);
                this.setState({
                    songpath: "/songs/" + res.body.filename
                });
            });
        });
    }
    render() {
        return (
            <center>
                <h1>Welcome to the ded.zone home page!</h1>
                <h3>Here is our most recently uploaded song:</h3>
                <audio controls src={this.state.songpath}></audio>
            </center>
        );
    }
}

class Footer extends React.Component {
    render() {
        return (<footer className="footer text-light bg-dark">
            <div className="container" id="footercontainer">
                <center>
                    <div className="text-muted">
                        <span>ded.zone 2017 |</span>
                        <a href="https://twitter.com/Junkie5XL"> Twitter</a>
                        <span> |</span>
                        <a href="https://steamcommunity.com/id/detriment"> Steam</a>
                    </div>
                </center>
            </div>
        </footer>);
    }
}

ReactDOM.render(<Layout />, document.getElementById("root"));