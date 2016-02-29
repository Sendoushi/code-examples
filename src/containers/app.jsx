import React from 'react';
import ReactDOM from 'react-dom';
import outdatedBrowser from 'bedrock/outdatedbrowser';
import actions from 'modules/actions.js';
import { Posts } from 'components/posts/posts.jsx';

// -----------------------------------------
// VARS

// -----------------------------------------
// FUNCTIONS

/**
 * Sets a new query
 * @param  {tag} self
 * @param  {event} evt
 */
const onChange = (self, evt) => {
    const query = evt.target && evt.target.value;

    evt.stopPropagation();

    // Throttler needed for better performance
    // and there is no need to constantly request
    (!!self.throttler) && clearTimeout(self.throttler);
    self.throttler = setTimeout(() => {
        // Remove old timer
        self.throttler = null;

        // Request new data
        (!!query) && actions.setContent({
            type: 'SEARCH',
            params: { query }
        });
    }, 1000);
};

/**
 * Component mount
 * @param  {tag} self
 */
const componentDidMount = (self) => {
    const defaultQuery = actions.getState().app.content.params.query;

    // Set outdated browser
    outdatedBrowser({ lowerThan: 'IE11', languagePath: '' });

    // Add for the actions update
    self.unsubscribe = actions.subscribe(() => {
        self.setState(actions.getState());
    });

    // Request first default query
    actions.changeQuery(defaultQuery);

    // Initialize vars
    self.state = {};
};

/**
 * Component unmount
 * @param  {tag} self
 */
const componentWillUnmount = (self) => {
    (!!self.throttler) && clearTimeout(self.throttler);

    // Unsubscribe
    self.unsubscribe && self.unsubscribe();
    self.unsubscribe = null;
};

/**
 * Renders tag
 * @param  {tag} self
 */
const render = (self) => {
    const onChangeHandler = evt => onChange(self, evt);
    const onSubmit = evt => evt.preventDefault();
    let posts = self.state && self.state.posts;

    // Get an initial
    posts = posts || actions.getInitial().posts;

    return (
    <div>
        <div id="outdated">
            <h6>Your browser is out-of-date!</h6>
            <p>Update your browser to view this website correctly. <a href="http://outdatedbrowser.com/" id="btnUpdateBrowser">Update my browser now </a></p>
            <p className="last"><a title="Close" id="btnCloseUpdateBrowser" href="#">&times;</a></p>
        </div>
        <div className="header-wrapper">
            <div className="header">
                <div className="logo">Reddit</div>
                <form onSubmit={onSubmit}>
                    <input type="text" name="search" className="search-input" onChange={onChangeHandler} />
                </form>
            </div>
        </div>
        <div className="posts-wrapper">
            <Posts {...posts}/>
        </div>
    </div>
    );
};

// -----------------------------------------
// The tag

class App extends React.Component {
    componentDidMount() { componentDidMount(this); }
    componentWillUnmount() { componentWillUnmount(this); }

    render() { return render(this); }
}

/**
 * Mounts app
 * @param  {element} el
 */
const mountApp = el => ReactDOM.render(<App/>, el);

// -------------------------------------------
// EXPORT

export { App, mountApp };
