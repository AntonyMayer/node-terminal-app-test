# node-terminal-app-test
Installation:
    1. Clone repository
    2. npm install
    3. npm link

Commands:
    jira get [project name] [flag]      
    jira get                            returns open tickets for default project;
    jira get -u                         returns open tickets for default project assigned to current user;
    jira get -a                         returns all tickets for default project;
    jira get ABC                        returns open tickets for specified project (ABC);
    jira get ABC -ua                    flags can be combined;

