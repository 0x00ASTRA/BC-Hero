# Project Branches
### And how to use them

## Core Branches
#### ** master **
    master is the 'master' copy of the most stable version of the codebase. master only merges from stable.
#### ** dev **
    dev is the 'develpment' copy of the codebase and its what houses the most recent changes and features.
#### ** release **
    release is where you can find the most stable versions of the codebase. If you intend to use the application, this would be the branch you clone.


## Branch Tree
master
 - dev
    |- docs
    |- test
    |- feature
    |- beta_[release_version]
 - release
    |- legacy
    |            ^
    |   |- release_versions
    |            v
    |- stable
    |   |- release_version
    |   |- release_version
    |- nightly


## Source Control Flow
