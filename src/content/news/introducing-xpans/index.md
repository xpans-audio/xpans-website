+++
title = "Introducing xpans"
pubDate = 2026-05-09T03:00:00-05:00
description = "Spring has sprung."
authors = ["Ben Seigler"]
coverImage = "./cover.webp"
+++

## What is xpans?
xpans (pronounced like "expanse") is an open ecosystem for spatial audio. 
Specifically, source-based spatial audio.

In xpans, every sound is a virtual audio source that has its own 3D position, 
size, and more. By giving sounds these properties, your music, movies, and 
games become much more immersive and interactive by personalizing the 
sound for your ears and environment. 

If you're familiar with Dolby Atmos or similar technologies, you will know this
concept as [Object-based audio](https://blog.soundparticles.com/what-is-object-based-audio).

xpans differs by aiming for audio sources to have an strictly defined shape
in addition to full 3D transforms, allowing audio sources to have position, 
non-uniform size, and rotation (Although some of this hasn't been implemented yet).

Additionally, xpans is an *ecosystem* of technology, not just a format.

xpans aims to develop a fully spatialized audio production workflow. 
Our Spatial Property Exchange (SPE) protocol lets audio plugins consider
where audio sources are in virtual space, creating immersive effects that
reinforce the spatial qualities of your mix. 

I began designing and developing xpans for my own music, 
dissatisfied using similar technologies like Dolby Atmos.

## My issues with Dolby Atmos (and other technologies)
One of the first things I noticed about Dolby Atmos, even before mixing with it,
was the reverb it adds in headphone listening. At first I thought mixing 
engineers were adding it into their Atmos mixes to make them sound more "immersive", 
but it was the renderer itself taking creative control. xpans doesn't do this. 
Instead, it gives creators control over their mix and does just enough to provide 
a good spatial impression to the listener.

Dolby Atmos also has what I call a "spatial bias". In stereo rendering, 
audio sources that are placed beside or behind the listener are attenuated, making
their total volume less than what it would be if they were in front of 
the listener. In some mixes, I could hear that some engineers tried to compensate 
for this by boosting the volume, which just makes it louder than intended in 
headphone listening. xpans doesn't do this either. You are in control of your 
levels.
> Note: I discovered this using Fiedler Audio's Dolby Atmos Composer. 
The official Dolby Atmos renderer may be different.
<br></br>

Additionally, the way Dolby Atmos renders "size" is not based on the actual 
size/extent of an audio source. Instead "size" is the percentage of the 
listening environment that an audio source's signal will occupy. 
This is slightly misleading and not very "spatial".

I have more issues, but those are the main ones that inspired me to start 
my own ecosystem.

## Audio sources in your production
A huge gap in spatial audio production is... the production.
I wanted a way to send and receive spatial information to and from audio 
plugins. Not just that, I wanted the spatial data to flow through the
processing/FX chain just like audio and MIDI.

I created the Spatial Property Exchange (SPE) protocol to do just that.
With SPE, effects and instruments can process audio signals based on their
spatial properties and output audio sources themselves.
I call this "spatially-aware" processing. A reverb effect can generate 
reflections based on where an audio source is in virtual space, a flanger
can be modulated just by moving an audio source around or changing its extent,
the list goes on.

Spatially-aware processing can make your mix sound much more immersive even if 
you were to just render it to plain old stereo. 

Two audio sources in this demo make use of a subtle spatially-aware chorus effect. 
Can you tell which ones? (Headphones required)

<audio src="/_assets/media/news/introducing-xpans/spe-demo.ogg" controls></audio>

Here's a version with the audio sources with chorus solo:

<audio src="/_assets/media/news/introducing-xpans/spe-chorus-solo.ogg" controls></audio>

And now without the chorus effect:

<audio src="/_assets/media/news/introducing-xpans/spe-no-chorus.ogg" controls></audio>

> You'll notice that even though we're rendering for headphones in this demo, 
most of the mix doesn't sound too unlike regular stereo. 
xpans' rendering is designed to be subtle and **predictable**.

Creators and developers can experiment with SPE right now! All of xpans' 
Essential Plugins make use of SPE. SPE is currently wrapped in MIDI System 
Exclusive messages, so as long as your DAW supports MIDI SysEx, SPE should 
work in your DAW. 

You can download xpans' [Essential Plugins suite using this link](/create/essential-plugins).

For developers, [here's SPE-MIDI's source repository](https://github.com/xpans-audio/spe).

## Storing spatial audio scenes
In order to store spatial audio scenes, I made a very simple data format
called xpans Spatial Record (XSR). It's an intermediate format that can be 
easily modified and extended during the development of the xpans Ecosystem. 
It's most likely going to have frequent breaking changes, so beware.

You can [learn more about XSR in its source repository](https://github.com/xpans-audio/xpans_xsr).

### A spatial codec
In the future, I want xpans to design and implement a proper spatial codec.

My vision for a spatial codec is just that: a *spatial* codec.

A spatial codec would only include spatial data and would not include any 
audio data. A spatial stream would ideally be multiplexed with its associated
audio stream in a container format like OGG, MKV, or MP4.

This makes the spatial and audio codec independent of one another, and
ideally independent of the containing format.

## Rendering spatial audio scenes
Spatial audio scenes need to be rendered in order for listeners to
hear anything "spatially".

You can render spatial audio scenes in realtime using the monitoring plugins
offered in xpans' [Essential Plugins](/create/essential-plugins) suite
or at full speed using [Frontier](/create/frontier).

All xpans rendering applications use xpans' own 
[Violet rendering engine](https://github.com/xpans-audio/violet)
under the hood.

At the time of writing, I've implemented a few rendering modes: 
stereo, headphones, and mono.

## Rendering for stereo
Stereo rendering has two modes: positional and directional.

Positional stereo pans audio sources based on their position along the
left/right axis, while directional stereo pans audio sources based on their
direction from the center of the scene.

Extent rendering isn't properly implemented in stereo yet. 

Interact with the source code for the stereo rendering mode in its
[GitHub Repository](https://github.com/xpans-audio/render-modes).

## Rendering for headphones
For headphone listeners, we can incorporate several tricks to make
spatial audio scenes sound much more immersive than plain old stereo.

Not only do we pan audio signals based on their direction from the listener,
we also add a tiny bit of delay in the ear the audio source is farthest from.
This is called Interaural Time Difference, or ITD.
ITD simulates audio waves traveling through air and gives the illusion that the
sound is coming from somewhere outside of the listener's head.

One cool thing I've done is simulate distance from the listener by 
reducing the volume difference between the ears as an audio source moves
away from the listener. This lets you make audio sources sound like they are 
approaching the listener, maybe getting right up in their ear like a mosquito.
Note that this requires ITD to work.

In this demo, the audio source starts in front of the listener to their right, 
moves to their left, then moves directly beside the listener, and then begins 
approaching them. The distance effect is pretty apparent here.

(Headphones required)

<audio src="/_assets/media/news/introducing-xpans/headphones-demo.ogg" controls></audio>

Dolby Atmos technically simulates distance through it's "binaural modes", but 
you can't change how far or close an audio source sounds over time. It's also 
not based on the actual distance from the listener at all.

Read about the different parameters for headphone rendering in the 
[xpans Documentation](https://docs.xpans.audio/rendering/headphones).

Interact with the source code for the headphone rendering mode in its
[GitHub Repository](https://github.com/xpans-audio/render-modes).

## Rendering for mono
Mono rendering completely ignores spatial properties and sums all of the 
scene's audio channels together into one channel. Simple and predictable.

## What's next?
A lot. 

There's several foundational things that haven't been implemented. Extent 
rendering isn't correctly rendered in stereo or headphones, rotation and shape 
aren't even acknowledged in the codebase as far as I know, Frontier's user 
interface is finicky, and most of the Essential Plugins don't even have a user 
interface.

Documentation is also pretty scarce, but I think there's enough information
to get people using the ecosystem with a little effort and dedication.

Surround-sound rendering is a must. We should also think about new experimental 
rendering modes that don't assume a central listening position, similar to 
[Distance-based amplitude panning](https://www.jamoma.org/publications/attachments/icmc2009-dbap-rev1.pdf).

Headtracking for headphone rendering is a really big selling point for spatial
audio. I think it's important that gets started sooner rather than later.

As I previously discussed, having a lossless spatial codec is critical. XSR
is convenient for developers, but it's inefficient in so many ways.

SPE being wrapped in MIDI is a hacky workaround until there's an alternative
solution. I would prefer there to be a generic way to send and receive arbitrary
data through the processing/FX chain. We could also implement a dedicated SPE
protocol, but I don't feel like that's as good of a solution. Either solution
would require a lot of cooperation from outside forces, so we should be more
concerned with getting the more critical tasks done.

There's more listed on the [roadmap](https://docs.xpans.audio/ecosystem/roadmap).

Overall, I don't want this project to be rushed! I want to focus on making
each piece of the ecosystem simple and effective while allowing as much 
user/developer freedom as possible. We are aiming for quality rather than
quick, fast, and easy. I feel like this is a convenient place to link to the
[contributing guidelines](https://docs.xpans.audio/contribution-guidelines) 
and mention that xpans has a policy prohibiting submissions generated by LLMs
and other forms of Generative AI.

## Getting started
Thanks for reading! 

You can start using xpans by downloading and installing the 
[Essential Plugins](/create/essential-plugins) and experimenting
with xpans in your DAW.

If you want to go deeper, you can download [Frontier](/create/frontier)
to render your exported scenes or the sample scenes here:

[Noise.zip](https://download.xpans.audio/noise/Noise.zip)

[Onboard Demo.zip](https://download.xpans.audio/onboard-demo/Onboard%20Demo.zip)

<br></br>
If you're a developer and know Rust, you can start using xpans' technology and/or 
contributing to xpans by perusing the repositories on
[xpans' GitHub organization page](https://github.com/xpans-audio).

Thanks again!

— Ben
