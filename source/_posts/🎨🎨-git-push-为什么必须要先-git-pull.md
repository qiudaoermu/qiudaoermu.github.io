---
title: "🎨🎨-git-push-为什么必须要先-git-pull"
date: 2021-01-11
tags: 
- 开发日常
---
## (e.g., 'git pull ...') before pushing again
Use git pull to pull the latest changes from the remote repository to your local repository. In this case, pulling changes will require a merge because you have made changes to your local repository.

I'll provide an example and a picture to explain. Let's assume your last pull from origin/branch was at Commit B. You have completed and committed some work (Commit C). At the same time, someone else has completed their work and pushed it to origin/branch (Commit D). There will need to be a merge between these two branches.
```
local branch:                         --- Commit C 
                                    /
                                   /
                                  /
origin/branch: Commit A ------ Commit B ---- Commit D
```
Because you are the one that wants to push, **`Git forces`** you to perform the merge. To do so, you must first pull the changes from origin/branch.
```
local branch:                         --- Commit C -- Commit E
                                    /               /           
                                   /               /             
                                  /               /               
origin/branch: Commit A ------ Commit B ---- Commit D 
```
After completing the merge, you will now be allowed to fast-forward origin/branch to Commit E by pushing your changes.

Git requires that you handle merges yourself, because a merge may lead to **`conflicts`**.
