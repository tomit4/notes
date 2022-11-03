/**
 * Interceptor
 * Belongs to Decentraleyes.
 *
 * @author      Thomas Rientjes
 * @since       2016-04-06
 * @license     MPL 2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

/**
 * Interceptor
 */

var interceptor = {};

/**
 * Public Methods
 */

interceptor.handleRequest = function (requestDetails, tabIdentifier, tab) {

    let validCandidate, tabDomain, targetDetails, targetPath;

    validCandidate = requestAnalyzer.isValidCandidate(requestDetails, tab);

    if (!validCandidate) {

        return {
            'cancel': false
        };
    }

    tabDomain = helpers.extractDomainFromUrl(tab.url, true);

    if (tabDomain === null) {
        tabDomain = Address.EXAMPLE;
    }

    if (requestDetails.type === WebRequestType.XHR) {

        if (tabDomain !== interceptor.xhrTestDomain) {
            return interceptor._handleMissingCandidate(requestDetails.url);
        }
    }

    if (interceptor.taintedDomains[tabDomain] || (/yandex\./).test(tabDomain) ||
        (/wickedlocal\.com/).test(tabDomain)) {

        return interceptor._handleMissingCandidate(requestDetails.url, true);
    }

    targetDetails = requestAnalyzer.getLocalTarget(requestDetails);
    targetPath = targetDetails.path;

    if (!targetPath) {
        return interceptor._handleMissingCandidate(requestDetails.url);
    }

    if (!files.active[targetPath]) {
        return interceptor._handleMissingCandidate(requestDetails.url);
    }

    stateManager.requests[requestDetails.requestId] = {
        tabIdentifier, targetDetails
    };

    return {
        'redirectUrl': chrome.runtime.getURL(targetPath + fileGuard.secret)
    };
};

/**
 * Private Methods
 */

interceptor._handleMissingCandidate = function (requestUrl, preserveUrl) {

    let requestUrlSegments;

    if (interceptor.blockMissing === true) {

        return {
            'cancel': true
        };
    }

    if (preserveUrl === true) {

        return {
            'cancel': false
        };
    }

    requestUrlSegments = new URL(requestUrl);

    if (requestUrlSegments.protocol === Address.HTTP) {

        requestUrlSegments.protocol = Address.HTTPS;
        requestUrl = requestUrlSegments.toString();

        return {
            'redirectUrl': requestUrl
        };

    } else {

        return {
            'cancel': false
        };
    }
};

interceptor._handleStorageChanged = function (changes) {

    if (Setting.XHR_TEST_DOMAIN in changes) {
        interceptor.xhrTestDomain = changes.xhrTestDomain.newValue;
    }

    if (Setting.BLOCK_MISSING in changes) {
        interceptor.blockMissing = changes.blockMissing.newValue;
    }
};

/**
 * Initializations
 */

// Temporary list of tainted domains.
interceptor.taintedDomains = {
    '10fastfingers.com': true,
    'ack.net': true,
    'adelnews.com': true,
    'adherent.lavilleavelo.org': true,
    'advocatepress.com': true,
    'aledotimesrecord.com': true,
    'alicetx.com': true,
    'amarillo.com': true,
    'amestrib.com': true,
    'amtrib.com': true,
    'anyvan.com': true,
    'apalachtimes.com': true,
    'ardmoreite.com': true,
    'augustachronicle.com': true,
    'auroraadvertiser.net': true,
    'barnesville-enterprise.com': true,
    'barnstablepatriot.com': true,
    'basissetexchange.org': true,
    'bcdemocratonline.com': true,
    'beauregarddailynews.net': true,
    'blog.datawrapper.de': true,
    'blueridgenow.com': true,
    'blufftontoday.com': true,
    'boonevilledemocrat.com': true,
    'boonvilledailynews.com': true,
    [`br.span${'kb'}ang.com`]: true,
    'brownwoodtx.com': true,
    'buckscountycouriertimes.com': true,
    'bundleofholding.com': true,
    'burlingtoncountytimes.com': true,
    'butlercountytimesgazette.com': true,
    'cambridgechron.com': true,
    'cantondailyledger.com': true,
    'cantonrep.com': true,
    'capecodtimes.com': true,
    'captcha.realtek.com': true,
    'carmitimes.com': true,
    'cdnjs.com': true,
    'cellmapper.net': true,
    'charlestonexpress.com': true,
    'cheboygannews.com': true,
    'chieftain.com': true,
    'chillicothenews.com': true,
    'chillicothetimesbulletin.com': true,
    'chipleypaper.com': true,
    'chronicle-express.com': true,
    'circuitlab.com': true,
    'cjonline.com': true,
    'code.world': true,
    'columbiadailyherald.com': true,
    'columbiatribune.com': true,
    'courier-tribune.com': true,
    'creativecommons.org': true,
    'crestviewbulletin.com': true,
    'crookstontimes.com': true,
    'csgostats.gg': true,
    'daily-jeff.com': true,
    'dailycomet.com': true,
    'dailycommercial.com': true,
    'dansvilleonline.com': true,
    'de.sharkoon.com': true,
    [`de.span${'kb'}ang.com`]: true,
    'devilslakejournal.com': true,
    'dispatch.com': true,
    'docs.servicenow.com': true,
    'dodgeglobe.com': true,
    'donaldsonvillechief.com': true,
    'doverpost.com': true,
    'dropbox.com': true,
    'eastpeoriatimescourier.com': true,
    'echo-news.co.uk': true,
    'echo-pilot.com': true,
    'edinburgreview.com': true,
    'ellwoodcityledger.com': true,
    'en.sharkoon.com': true,
    'enterprisenews.com': true,
    'epey.com': true,
    'es.sharkoon.com': true,
    [`es.span${'kb'}ang.com`]: true,
    'evoice.com': true,
    'examiner-enterprise.com': true,
    'examiner.net': true,
    'fayobserver.com': true,
    'fosters.com': true,
    'fowlertribune.com': true,
    'fr.sharkoon.com': true,
    [`fr.span${'kb'}ang.com`]: true,
    'freebusy.io': true,
    'gadsdentimes.com': true,
    'gainesville.com': true,
    'galesburg.com': true,
    'galvanews.com': true,
    'gastongazette.com': true,
    'gazetadopovo.com.br': true,
    'gctelegram.com': true,
    'gdt.oqlf.gouv.qc.ca': true,
    'geneseorepublic.com': true,
    'globetrotter.de': true,
    'glowing-bear.org': true,
    'goerie.com': true,
    'goupstate.com': true,
    'grandlakenews.com': true,
    'granitefallsnews.com': true,
    'greenwooddemocrat.com': true,
    'hamburgreporter.com': true,
    'hannibal.net': true,
    'havenews.com': true,
    'hdnews.net': true,
    'helena-arkansas.com': true,
    'heralddemocrat.com': true,
    'heraldnews.com': true,
    'heraldtribune.com': true,
    'hillsdale.net': true,
    'hockessincommunitynews.com': true,
    'hollandsentinel.com': true,
    'houmatoday.com': true,
    'hsvvoice.com': true,
    'hutchnews.com': true,
    'ico.org.uk': true,
    [`id.span${'kb'}ang.com`]: true,
    'identi.ca': true,
    [`in.span${'kb'}ang.com`]: true,
    'indeonline.com': true,
    'it.sharkoon.com': true,
    [`it.span${'kb'}ang.com`]: true,
    'ja.sharkoon.com': true,
    'jacksonnewspapers.com': true,
    'jacksonville.com': true,
    'jdnews.com': true,
    'journaldemocrat.com': true,
    'journalstandard.com': true,
    'joyfulnoiserecordings.com': true,
    [`jp.span${'kb'}ang.com`]: true,
    'kinston.com': true,
    'kiowacountysignal.com': true,
    'kirksvilledailyexpress.com': true,
    'ko.sharkoon.com': true,
    [`la.span${'kb'}ang.com`]: true,
    'labdoor.com': true,
    'lajuntatribunedemocrat.com': true,
    'lakenewsonline.com': true,
    'laziska.com.pl': true,
    'leavenworthtimes.com': true,
    'leesvilledailyleader.com': true,
    'lemon-aid.de': true,
    'lenconnect.com': true,
    'leominsterchamp.com': true,
    'lincolncourier.com': true,
    'linkbostonhomes.com': true,
    'linncountyleader.com': true,
    'lubbockonline.com': true,
    'm-ce.pl': true,
    'manualslib.com': true,
    'mcdonoughvoice.com': true,
    'mcphersonsentinel.com': true,
    'meslieux.paris.fr': true,
    'metrowestdailynews.com': true,
    'mexicoledger.com': true,
    'mgm.gov.tr': true,
    'miamiok.com': true,
    'middletowntranscript.com': true,
    'midlothianmirror.com': true,
    'milfordbeacon.com': true,
    'milforddailynews.com': true,
    'millburysutton.com': true,
    'minigames.mail.ru': true,
    'miniquadtestbench.com': true,
    'moberlymonitor.com': true,
    'mojbytom.pl': true,
    'mojchorzow.pl': true,
    'mojegliwice.pl': true,
    'mojekatowice.pl': true,
    'mojetychy.pl': true,
    'mojmikolow.pl': true,
    'monroecopost.com': true,
    'monroenews.com': true,
    'montenews.com': true,
    'morningsun.net': true,
    'mortontimesnews.com': true,
    'moscowvillager.com': true,
    'mpnnow.com': true,
    [`ms.span${'kb'}ang.com`]: true,
    'mtshastanews.com': true,
    'mytownneo.com': true,
    'ncnewspress.com': true,
    'neagle.com': true,
    'neoshodailynews.com': true,
    'nevadaiowajournal.com': true,
    'newbernsj.com': true,
    'newcomerstown-news.com': true,
    'newlook.dteenergy.com': true,
    'newportri.com': true,
    'news-journalonline.com': true,
    'news-star.com': true,
    'newschief.com': true,
    'newsherald.com': true,
    'newsrepublican.com': true,
    'newstribune.info': true,
    'nhm.ac.uk': true,
    'nl.sharkoon.com': true,
    [`nl.span${'kb'}ang.com`]: true,
    'northneighbornews.com': true,
    'norwichbulletin.com': true,
    'nwfdailynews.com': true,
    'oakridger.com': true,
    'ocala.com': true,
    'ohio.com': true,
    'olneydailymail.com': true,
    'onlineathens.com': true,
    'onwelo.com': true,
    'opavote.com': true,
    'opendata.cbs.nl': true,
    'openweathermap.org': true,
    'oriongazette.com': true,
    'orzesze.com.pl': true,
    'ottawaherald.com': true,
    'palmbeachpost.com': true,
    'pandoc.org': true,
    'paris-express.com': true,
    'patriotledger.com': true,
    'pawhuskajournalcapital.com': true,
    'pbcommercial.com': true,
    'pekintimes.com': true,
    'peoplefone.ch': true,
    'piekaryslaskie.com.pl': true,
    'pjstar.com': true,
    'pl.sharkoon.com': true,
    [`pl.span${'kb'}ang.com`]: true,
    'poconorecord.com': true,
    'poedb.tw': true,
    'pontiacdailyleader.com': true,
    'postsouth.com': true,
    'pratttribune.com': true,
    'pressargus.com': true,
    'pressmentor.com': true,
    'processtypefoundry.com': true,
    'progress-index.com': true,
    'prosperpressnews.com': true,
    'providencejournal.com': true,
    'pt.sharkoon.com': true,
    [`pt.span${'kb'}ang.com`]: true,
    'pyskowice.com.pl': true,
    'qwertee.com': true,
    'record-courier.com': true,
    'recordnet.com': true,
    'recordonline.com': true,
    'recordstar.com': true,
    'redwoodfallsgazette.com': true,
    'regentgreymouth.co.nz': true,
    'registerguard.com': true,
    'report-uri.io': true,
    'reviewatlas.com': true,
    'ridgecrestca.com': true,
    'rrstar.com': true,
    'ru.sharkoon.com': true,
    [`ru.span${'kb'}ang.com`]: true,
    'rudaslaska.com.pl': true,
    'runnelscountyregister.com': true,
    'rybnicki.com': true,
    'salina.com': true,
    'savannahnow.com': true,
    'scan.nextcloud.com': true,
    'scotthelme.co.uk': true,
    'scsuntimes.com': true,
    [`se.span${'kb'}ang.com`]: true,
    'seacoastonline.com': true,
    'securityheaders.com': true,
    'securityheaders.io': true,
    'sekvoice.com': true,
    'sentinel-standard.com': true,
    'shelbystar.com': true,
    'siemianowice.net.pl': true,
    'signal.org': true,
    'siskiyoudaily.com': true,
    'sj-r.com': true,
    'sjnewsonline.com': true,
    'sleepyeyenews.com': true,
    'somiibo.com': true,
    'sooeveningnews.com': true,
    'sosnowiecki.pl': true,
    'southcoasttoday.com': true,
    [`span${'kb'}ang.com`]: true,
    'srpressgazette.com': true,
    'stadium.se': true,
    'starcourier.com': true,
    'starfl.com': true,
    'starnewsonline.com': true,
    'statesman.com': true,
    'staugustine.com': true,
    'stefansundin.github.io': true,
    'steubencourier.com': true,
    'stjamesnews.com': true,
    'sturgisjournal.com': true,
    'stuttgartdailyleader.com': true,
    'swiony.pl': true,
    'swtimes.com': true,
    'taftmidwaydriller.com': true,
    'tauntongazette.com': true,
    'telegram.com': true,
    'teutopolispress.com': true,
    [`th.span${'kb'}ang.com`]: true,
    'the-daily-record.com': true,
    'the-dispatch.com': true,
    'the-leader.com': true,
    'the-review.com': true,
    'thecarbondalenews.com': true,
    'thedailyreporter.com': true,
    'thedestinlog.com': true,
    'thegraftonnews.com': true,
    'thegurdontimes.com': true,
    'thehawkeye.com': true,
    'theintell.com': true,
    'thekansan.com': true,
    'thelandmark.com': true,
    'theledger.com': true,
    'theperrychief.com': true,
    'therecordherald.com': true,
    'therolladailynews.com': true,
    'thesuburbanite.com': true,
    'thetimesnews.com': true,
    'thisweeknews.com': true,
    'times-gazette.com': true,
    'timescale.com': true,
    'timesonline.com': true,
    'timesreporter.com': true,
    'timestelegram.com': true,
    'tones.be': true,
    'topsailadvertiser.com': true,
    'tr.sharkoon.com': true,
    [`tr.span${'kb'}ang.com`]: true,
    'transcend-info.com': true,
    'tunemymusic.com': true,
    'tuscaloosanews.com': true,
    'udacity.com': true,
    'unifiedportal-mem.epfindia.gov.in': true,
    'uticaod.com': true,
    'uworld.com': true,
    'vanalstyneleader.com': true,
    'viaplay.se': true,
    'vvdailypress.com': true,
    'waltonsun.com': true,
    'washingtontimesreporter.com': true,
    'waxahachietx.com': true,
    'wayneindependent.com': true,
    'waynepost.com': true,
    'web-patient.dk': true,
    'weeklycitizen.com': true,
    'wellingtondailynews.com': true,
    'wellsvilledaily.com': true,
    'whitehalljournal.com': true,
    'wodzislaw.com.pl': true,
    'woodfordtimes.com': true,
    'worcestermag.com': true,
    'yadi.sk': true,
    'yelp.com': true,
    'yourglenrosetx.com': true,
    'yourstephenvilletx.com': true,
    'yourvalleyvoice.com': true,
    'yourvotematters.co.uk': true,
    'zabrze.com.pl': true,
    'zh-hant.sharkoon.com': true,
    'zory.com.pl': true
};

interceptor.amountInjected = 0;
interceptor.xhrTestDomain = Address.DECENTRALEYES;
interceptor.blockMissing = false;

interceptor.relatedSettings = [];

interceptor.relatedSettings.push(Setting.AMOUNT_INJECTED);
interceptor.relatedSettings.push(Setting.XHR_TEST_DOMAIN);
interceptor.relatedSettings.push(Setting.BLOCK_MISSING);

helpers.getStoredSettings(interceptor.relatedSettings, function (items) {

    interceptor.amountInjected = items.amountInjected || 0;
    interceptor.xhrTestDomain = items.xhrTestDomain || Address.DECENTRALEYES;
    interceptor.blockMissing = items.blockMissing || false;
});

/**
 * Event Handlers
 */

chrome.storage.onChanged.addListener(interceptor._handleStorageChanged);
