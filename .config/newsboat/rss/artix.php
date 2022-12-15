<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
    <channel>
        <title>Artix Linux news</title>
        <description>News from Artix Linux</description>
        <link>https://artixlinux.org/</link>
        <lastBuildDate>Thu, 25 Aug 2022 00:00:00 GMT</lastBuildDate>
        <managingEditor>sgorava@artixlinux.org (Juraj Oravec)</managingEditor>
        <item>
            <title> Debuginfod server deployed</title>
            <link>https://artixlinux.org/news.php#Debuginfod_server_deployed</link>
            <guid isPermaLink="true">https://artixlinux.org/news.php#Debuginfod_server_deployed</guid>
            <pubDate>Thu, 25 Aug 2022 00:00:00 GMT</pubDate>
            <description>
Our debuginfod service is up and running at &lt;a href=&quot;https://debuginfod.artixlinux.org&quot;&gt;https://debuginfod.artixlinux.org&lt;/a&gt;.&lt;br&gt;
&lt;br&gt;
Read the &lt;a href=&quot;https://lists.artixlinux.org/archives/artix-announce/2022-August/000006.html&quot;&gt;mailing list announcement&lt;/a&gt; for more details.
</description>
        </item>
        <item>
            <title> New official installation images</title>
            <link>https://artixlinux.org/news.php#New_official_installation_images</link>
            <guid isPermaLink="true">https://artixlinux.org/news.php#New_official_installation_images</guid>
            <pubDate>Sat, 23 Jul 2022 00:00:00 GMT</pubDate>
            <description>
New official installation media are available at our &lt;a href=&quot;https://artixlinux.org/download.php&quot;&gt;download section&lt;/a&gt;.&lt;br&gt;
</description>
        </item>
        <item>
            <title>artix-archlinux-support moves to [universe]</title>
            <link>https://artixlinux.org/news.php#artix-archlinux-support_moves_to_%5Buniverse%5D</link>
            <guid isPermaLink="true">https://artixlinux.org/news.php#artix-archlinux-support_moves_to_%5Buniverse%5D</guid>
            <pubDate>Mon, 27 Jun 2022 00:00:00 GMT</pubDate>
            <description>
As more and more packages are available through our repositories, we
decided to move &lt;i&gt;artix-archlinux-support&lt;/i&gt; to the [universe] repository.
This package provides virtual systemd dependencies and Arch repository entries in &lt;b&gt;/etc/pacman.conf&lt;/b&gt;.
New users who wish to use Arch-provided packages, especially from [community], should:
&lt;br&gt;&lt;br&gt;
 1. &lt;a href=&quot;https://wiki.artixlinux.org/Main/Repositories#Universe&quot;&gt;Enable the [universe] repository&lt;/a&gt;
&lt;br&gt;
 2. Install &lt;i&gt;artix-archlinux-support&lt;/i&gt; and follow the post-install instructions
&lt;br&gt;&lt;br&gt;
Existing users who have already enabled the Arch repositories are not affected.
</description>
        </item>
        <item>
            <title>Suite66 retirement</title>
            <link>https://artixlinux.org/news.php#Suite66_retirement</link>
            <guid isPermaLink="true">https://artixlinux.org/news.php#Suite66_retirement</guid>
            <pubDate>Wed, 08 Jun 2022 00:00:00 GMT</pubDate>
            <description>
Support for the 66 init system (also called suite66 here) has
officially been retired.
&lt;br&gt;&lt;br&gt;
The primary reasons are the lack of
maintainership (the previous 66 maintainer stepped down) and the
significant overlap with other init systems. For now, all suite66
packages have been moved to the &lt;a href=&quot;https://wiki.artixlinux.org/Main/Repositories#Universe&quot;&gt;[universe] repository&lt;/a&gt; where they will remain
for some unspecified period of time before being removed completely.
&lt;br&gt;
Current 66 users are encouraged to switch to another init as soon as
possible with s6 being the recommended choice for those who want
something similar. Check the Wiki &lt;a href=&quot;https://wiki.artixlinux.org/Main/SwitchInit&quot;&gt;for a brief guide on switching init systems&lt;/a&gt;.
&lt;br&gt;&lt;br&gt;
Follow this announcement on our &lt;a href=&quot;https://forum.artixlinux.org/index.php/topic,4135.msg26657/topicseen.html#msg26657&quot;&gt;forum&lt;/a&gt;.
</description>
        </item>
        <item>
            <title>FFMPEG upgrade</title>
            <link>https://artixlinux.org/news.php#FFMPEG_upgrade</link>
            <guid isPermaLink="true">https://artixlinux.org/news.php#FFMPEG_upgrade</guid>
            <pubDate>Tue, 25 Jan 2022 00:00:00 GMT</pubDate>
            <description>
The latest ffmpeg-2:5.0-3 was accidentally pulled earlier than intended from our staging ([goblins]) repository. 
If you haven't upgraded yet and use stuff with ffmpeg dependencies from the Arch repositories, 
refrain from upgrading for now.
&lt;br&gt;&lt;br&gt;
If you have already upgraded, you can either 
&lt;a href=&quot;https://forum.artixlinux.org/index.php/topic,3582.msg23145.html#msg23145&quot;&gt;downgrade to the status-quo ante&lt;/a&gt;,
using the Artix and Arch package archives or install 
&lt;a href=&quot;https://forum.artixlinux.org/index.php/topic,3582.msg23255.html#msg23255&quot;&gt;&lt;i&gt;ffmpeg4.4&lt;/i&gt; 
from [galaxy] (easier)&lt;/a&gt;.
&lt;code&gt;sudo pacman -Sy --asdeps ffmpeg4.4&lt;/code&gt;
or, if you get dependency errors
&lt;code&gt;sudo pacman -Sy --asdeps ffmpeg ffmpeg4.4&lt;/code&gt;
&lt;br&gt;
All affected packages in our own repositories have already rebuilt against the new ffmpeg, so ffmpeg4.4 
should only be needed until Arch rolls its own packages out of [staging].
</description>
        </item>
        <item>
            <title> The first official installation images of 2022</title>
            <link>https://artixlinux.org/news.php#The_first_official_installation_images_of_2022</link>
            <guid isPermaLink="true">https://artixlinux.org/news.php#The_first_official_installation_images_of_2022</guid>
            <pubDate>Sun, 23 Jan 2022 00:00:00 GMT</pubDate>
            <description>
After extensive testing and bug squashing, we are pleased to announce &lt;a href=&quot;https://artixlinux.org/download.php&quot;&gt;new stable ISO releases&lt;/a&gt;.&lt;br&gt;
</description>
        </item>
        <item>
            <title>Support for dinit is now official</title>
            <link>https://artixlinux.org/news.php#Support_for_dinit_system_is_now_official</link>
            <guid isPermaLink="true">https://artixlinux.org/news.php#Support_for_dinit_system_is_now_official</guid>
            <pubDate>Mon, 08 Nov 2021 00:00:00 GMT</pubDate>
            <description>
A new init system, &lt;a href=&quot;https://github.com/davmac314/dinit&quot;&gt;dinit&lt;/a&gt;, has left testing and entered the &lt;a href=&quot;https://artixlinux.org/download.php#weekly&quot;&gt;weekly downloads section&lt;/a&gt;. 
Should you decide to try it out, please report your findings to our &lt;a href=&quot;https://forum.artixlinux.org/index.php/topic,3255.new.html&quot;&gt;new forum board&lt;/a&gt;.</description>
        </item>
        <item>
            <title>Octopi and Pamac moved to [universe]</title>
            <link>https://artixlinux.org/news.php#Octopi_and_Pamac_moved_to_%5Buniverse%5D</link>
            <guid isPermaLink="true">https://artixlinux.org/news.php#Octopi_and_Pamac_moved_to_%5Buniverse%5D</guid>
            <pubDate>Mon, 25 Oct 2021 00:00:00 GMT</pubDate>
            <description>
To accommodate for the wishes of the users who expressed their
preference to have pamac and octopi provided by Artix, these have now
been added to the - &lt;strong&gt;not officially supported&lt;/strong&gt; - universe repository.
&lt;br /&gt;A clear warning and disclaimer are displayed when installing or
upgrading these packages:
&lt;br /&gt;
&lt;code&gt;&amp;gt;&amp;gt;&amp;gt; THIS TOOL IS NOT SUPPORTED BY ARTIX (NOR BY ARCH)
    THE USE OF AUR HELPERS CAN RESULT IN A BROKEN SYSTEM
    MAKE SURE TO HAVE A VALID BACKUP FIRST AND USE AT YOUR OWN RISK
&lt;/code&gt;
&lt;br&gt;
&lt;a href=&quot;https://forum.artixlinux.org/index.php/topic,3186.0.html&quot;&gt;Related forum discussion&lt;/a&gt;.
</description>
        </item>
        <item>
            <title>Octopi and Pamac removed from repositories</title>
            <link>https://artixlinux.org/news.php#Octopi_and_Pamac_removed_from_repositories</link>
            <guid isPermaLink="true">https://artixlinux.org/news.php#Octopi_and_Pamac_removed_from_repositories</guid>
            <pubDate>Fri, 22 Oct 2021 00:00:00 GMT</pubDate>
            <description>
Due to major issues occurring for users as a result of using some AUR helpers, it has been decided to remove Pamac and Octopi from our repositories.
&lt;br /&gt;
We know some users liked using these tools, but unfortunaly the havoc they keep creating outweighs their benefits.
&lt;br /&gt;&lt;br /&gt;
Join the discussion on the forum.&lt;br /&gt;
&lt;a href=&quot;https://forum.artixlinux.org/index.php/topic,3186.0.html&quot;&gt;https://forum.artixlinux.org/index.php/topic,3186.0.html&lt;/a&gt;

</description>
        </item>
        <item>
            <title>s6: Major s6-base and s6-scripts upgrade with new features</title>
            <link>https://artixlinux.org/news.php#s6%3A_Major_s6-base_and_s6-scripts_upgrade_with_new_features</link>
            <guid isPermaLink="true">https://artixlinux.org/news.php#s6%3A_Major_s6-base_and_s6-scripts_upgrade_with_new_features</guid>
            <pubDate>Tue, 21 Sep 2021 00:00:00 GMT</pubDate>
            <description>
The upcoming &lt;em&gt;s6-base&lt;/em&gt; &lt;strong&gt;2.0-1&lt;/strong&gt; and &lt;em&gt;s6-scripts&lt;/em&gt; &lt;strong&gt;20210921-1&lt;/strong&gt; packages introduce 
a couple of major new features for s6 users.
&lt;br /&gt;&lt;br /&gt;
First, the &lt;strong&gt;/etc/s6/adminsv&lt;/strong&gt; directory is supported for writing custom 
s6-rc services.&lt;br /&gt;
Additionally, network detection for services on startup is now supported 
via editing the new network bundle.
&lt;br /&gt;&lt;br /&gt;
For complete details, see the full announcement post on the forums.&lt;br /&gt;
&lt;a href=&quot;https://forum.artixlinux.org/index.php/topic,3064.0.html&quot;&gt;https://forum.artixlinux.org/index.php/topic,3064.0.html&lt;/a&gt;
</description>
        </item>
    </channel>
</rss>