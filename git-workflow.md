# Git/Github workflow

This git style stems from GitFlow with some little tweaks to ease our work.
Besides this we also have our own method for how to use github’s issues, reviews, etc.


## Issues

As soon as the project starts it is a good idea to open 2 issues:

- Issue #1 contains the project related documents (RFP, scope, discovery docs...). If the repo is public we move all the sensitive information to issue 1 of the `*-internal` variant of the repo.
- Issue #2 contains a pre-launch checklist with important items not to be forgotten. 

The remaining issues are related to the project itself. At the start of the project the issues are more generic:

    #3 Implement user authentication
    - The user should be able to login with a username and password, recover the password and logout

And then when the developer picks up the task he/she should spec it better:

    #4 Add login endpoint
    - Should accept a username and password coming from a form.
    - When credentials are valid a token should be returned.
    
    #5 Add logout endpoint
    - Invalidate the user token.
    
    # ...

Having a good list of issues is helpful to know what is done and what is still missing, and someone that jumps in at a later stage can get a clearer picture as well. It is good practice to reference/fix issues through commit messages, which helps building changelogs for when we need to update clients, create releases, etc.
It's also psychologically rewarding to finish a sprint and see a bunch of items completed. There's something about humans and ticking items off a list.

## Branches
- The `master` branch is only used for deployments and whenever there's a merge to master a new release should be created (more below). This is also the branch that triggers automatic CI deployments.
- The `develop` branch is the main branch and where development happens. Pull requests can be merged somewhat freely but the code on this branch has to be working.
- Feature branches should be created off `develop` (there are exceptions obviously) and follow some "guides":
    - When they refer to a specific issue, it is good to include the issue number for example: `feature/5-login`.
    - It is also possible that a branch tackles a broader feature, and in this case it's possible to omit the number: `feature/user-account`.
- Hotfix branches are the only ones to be created from `master` and follow the same naming as `feature` branches. Hotfix branches should always have an issue associated with it. (otherwise it's not really fixing anything) Example: `hotfix/10-invalid-cookie`. These branches are then merged into `master` and `develop`.
- We've been using `content` branches form some websites and they help differentiate code from content. For example:
    - `content/post-machine-learning`
    - `content/team-daniel-da-silva`

#### Notes

- The branch type should be separated from the name with a `/`. Branch names should be separated with `-`.
- Sometimes there are branches that tackle a single bug that was found in `develop`. In that case we often use `fix/something`. The best approach would be to name the branch something like `fix/203-padding`, and create an associated issue but the former is also valid.
- Fell free to break these guides if there's a reason for it.


## Renaming branches
If you start a branch and then get carried away with issue fixing and the name doesn't make sense anymore, you should rename the branch. If your code is still local it won't cause any problems. If you already pushed you can still rename it and force push, but you need to be sure no one touched your branch. See Work-in-progress PRs.


## Commit messages

Clear commit messages are very useful when looking back and understanding what has done. This may seem a bit excessive but given the amount of times a good commit message proved useful, it is good to have some consistency.
Messages starting with a capital, written in imperative mode and structured like this, proved the most helpful.

    Short (50 chars or less) summary of changes
    
    More detailed explanatory text, if necessary. The blank line between
    the summary and the extended description is important.

Whenever working on a specific issue we should reference the number, either with `contribute to #12` (GH will mention the commit on the issue) or `fix #12` (GH will close the issue once the code is merged to the default branch).

    Add login endpoint
    
    Fix #4


## Pull requests and Review

Pull requests are made from the branch being worked on to `develop` and should be merged after they were reviewed. It is not a problem and actually recommended for a developer to merge his/her own pull requests as long as the code was reviewed and approved:

1. Developer A opens PR and assigns Developer B as reviewer;
2. Developer B reviews and requests changes;
3. Developer A addresses request;
4. Developer B approves;
5. Developer A merges.

## Work-in-progress PR [WIP]
A feature branch belongs to its author until a PR is opened. During this period he/she can change things around, rebase, rename, etc. Once a PR is opened the branch is assumed to be public and destructive actions should be carried out very carefully.

However, there are times when it is useful to open a PR to take advantage of the diff tool, to keep track of work, and so other developers know the work being done. In these cases use the `[WIP]` prefix to indicate that this PR is still likely to change and shouldn’t be considered stable.


![](https://paper-attachments.dropbox.com/s_D9BE8C81C3C7C6CF569CA9EEAD2ED479F518503EFFD883C8210E9648A60DAF5E_1553514661592_image.png)


## Deploy PR
A pull request made from `develop => master` indicates a deployment and including a changelog is very helpful for client comms and can then be used for the release tag (see Releases).

![](https://paper-attachments.dropbox.com/s_D9BE8C81C3C7C6CF569CA9EEAD2ED479F518503EFFD883C8210E9648A60DAF5E_1553514926569_image.png)

## Releases

Ideally releases should be created every time something gets merged to `master` following semver. It should also include a description of what is new. This is good for us to keep track of what we did and when, and also for those clients who like to check the code.

    v0.1.0-alpha1
    
    - Base site scaffold (build automation)
    - Home page structure
