# node-terminal-app-test
**Installation:**

Manual

1.         Clone repository
1.         npm install
1.         npm link

NPM

1. 		    not yet...

**Commands:**

    jira get [project name] [flag]    
    jira get                            returns open tickets for default project;
    jira get -u                         returns open tickets for default project assigned to current user;
    jira get -a                         returns all tickets for default project;
    jira get ABC                        returns open tickets for specified project (ABC);
    jira get ABC -ua                    flags can be combined;
    jira init                           run initialization

**Initialization:**

User inputs

    - server    - [optional], skip to use default 'https://track.designory.com:8443', will be stored in '.jira'
    - project   - default project, will be stored in '.jira'
    - username  - usernamre for authentication, will be stored in '.jira'
    - password  - password, will be used to write header for cookie authentication