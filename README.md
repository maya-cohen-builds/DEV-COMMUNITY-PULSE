# Dev Community Pulse

Real-time community intelligence dashboard for AI and ML developer communities.

Live: [dev-community-pulse.lovable.app](https://dev-community-pulse.lovable.app)

## What it does

Monitors 6 AI/ML subreddits simultaneously using the Reddit public API and
surfaces the signal that matters for developer community managers.

Feed view pulls live posts from r/LocalLLaMA, r/MachineLearning, r/mlops,
r/artificial, r/nvidia, and r/StableDiffusion with Hot, New, and Top sorting
and per-subreddit filtering.

Trending Topics ranks the most frequently mentioned terms across all monitored
communities in real time so you always know what developers are actually
talking about.

Sentiment tagging classifies each post as positive, neutral, or negative using
keyword analysis so you can triage community mood at a glance.

Bookmarks let you save posts with notes for follow-up or engagement tracking.

Search filters across all loaded posts by keyword simultaneously.

## Why I built it

Community managers need to know what developers care about before they can
show up authentically in those communities. This tool makes that intelligence
accessible in one place without manual subreddit hopping.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Reddit Public API
- Built with Lovable

## Built by

Maya Cohen — AI product builder, USC Marshall MBA
[mayacohenportfolio.lovable.app](https://mayacohenportfolio.lovable.app)
