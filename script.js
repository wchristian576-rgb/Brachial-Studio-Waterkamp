'use strict';

// Buildless, dependency-free and compatible with GitHub Pages project subpaths.
(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-nav');
  const navigationLinks = [...document.querySelectorAll('#main-nav a[href^="#"]')];
  const mobileMenu = window.matchMedia('(max-width: 900px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function closeMenu(restoreFocus = false) {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Menü öffnen');
    navigation.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    if (restoreFocus) menuButton.focus();
  }

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      navigation.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
    });
    navigationLinks.forEach(link => link.addEventListener('click', () => {
      const target = document.querySelector(link.hash);
      closeMenu();
      // Transfer keyboard focus to the selected section after closing the menu.
      if (mobileMenu.matches && target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      }
    }));
    document.addEventListener('keydown', event => {
      if (menuButton.getAttribute('aria-expanded') !== 'true') return;
      if (event.key === 'Escape') closeMenu(true);
      if (event.key === 'Tab') {
        const lastLink = navigationLinks[navigationLinks.length - 1];
        if (event.shiftKey && document.activeElement === menuButton) {
          event.preventDefault(); lastLink.focus();
        } else if (!event.shiftKey && document.activeElement === lastLink) {
          event.preventDefault(); menuButton.focus();
        }
      }
    });
    mobileMenu.addEventListener('change', () => { if (!mobileMenu.matches) closeMenu(); });
    window.addEventListener('pageshow', () => closeMenu());
  }

  // Select the section nearest the sticky header, including nested service sections.
  const sections = navigationLinks.map(link => document.querySelector(link.hash)).filter(Boolean);
  let scrollFrame = null;
  function updateActiveSection() {
    const threshold = (document.querySelector('.site-header')?.offsetHeight || 88) + 90;
    let active = sections[0];
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= threshold) active = section;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) active = sections[sections.length - 1];
    navigationLinks.forEach(link => {
      const selected = active && link.hash === `#${active.id}`;
      link.classList.toggle('is-active', Boolean(selected));
      if (selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scrollFrame = null;
  }
  if (sections.length) {
    window.addEventListener('scroll', () => {
      if (scrollFrame === null) scrollFrame = requestAnimationFrame(updateActiveSection);
    }, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });
    updateActiveSection();
  }

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    document.querySelectorAll('.reveal').forEach(element => {
      element.classList.add('will-reveal');
      observer.observe(element);
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  // One intro per page load. A blocked autoplay attempt always has a clear play button.
  const intro = document.querySelector('#studio-intro');
  const introPanel = document.querySelector('#intro-player');
  const introButton = document.querySelector('#intro-button');
  const introStatus = document.querySelector('#intro-status');
  if (intro && introPanel && introButton && introStatus) {
    let introFinished = false;
    let introStarting = false;
    let introHideTimer;
    intro.volume = 0.65;
    intro.loop = false;
    introPanel.hidden = false;

    function finishIntro(message) {
      if (introFinished) return;
      introFinished = true;
      intro.pause();
      introPanel.classList.remove('is-playing');
      introButton.hidden = true;
      introStatus.textContent = message;
      introHideTimer = window.setTimeout(() => { introPanel.hidden = true; }, 2200);
    }

    async function startIntro() {
      if (introFinished || introStarting) return;
      introStarting = true;
      introButton.disabled = true;
      introStatus.textContent = 'Intro wird geladen …';
      try {
        await intro.play();
        // A stop or navigation may have happened while play() was pending.
        if (introFinished) intro.pause();
      } catch (error) {
        if (introFinished) return;
        introPanel.classList.remove('is-playing');
        introStatus.textContent = error.name === 'NotAllowedError'
          ? 'Ein kurzer Einblick in unseren Sound.'
          : 'Intro konnte nicht geladen werden.';
        introButton.textContent = 'Intro abspielen';
      } finally {
        introStarting = false;
        introButton.disabled = false;
      }
    }

    intro.addEventListener('playing', () => {
      if (introFinished) { intro.pause(); return; }
      introPanel.classList.add('is-playing');
      introStatus.textContent = 'Das Studio-Intro läuft.';
      introButton.textContent = 'Intro stoppen';
      introButton.disabled = false;
    });
    intro.addEventListener('ended', () => finishIntro('Intro beendet. Dein Sound beginnt.'));
    intro.addEventListener('error', () => {
      if (introFinished) return;
      introPanel.classList.remove('is-playing');
      introStatus.textContent = 'Intro ist gerade nicht verfügbar.';
      introButton.hidden = true;
    });
    introButton.addEventListener('click', () => {
      if (!intro.paused) finishIntro('Intro gestoppt.');
      else startIntro();
    });
    document.querySelector('#intro-close').addEventListener('click', () => {
      finishIntro('Intro geschlossen.');
      window.clearTimeout(introHideTimer);
      introPanel.hidden = true;
    });
    window.addEventListener('pagehide', () => {
      finishIntro('Intro beendet.');
      window.clearTimeout(introHideTimer);
      introPanel.hidden = true;
    });
    startIntro();
  }

  const form = document.querySelector('#contact-form');
  const preview = document.querySelector('#request-preview');
  if (!form || !preview) return;

  const nameField = form.elements.namedItem('name');
  const emailField = form.elements.namedItem('email');
  const serviceField = form.elements.namedItem('service');
  const messageField = form.elements.namedItem('message');
  const status = document.querySelector('#request-status');
  const output = document.querySelector('#request-text');
  const mailLink = document.querySelector('#request-mailto');
  let currentDraft = '';

  document.querySelectorAll('[data-service]').forEach(link => {
    link.addEventListener('click', () => {
      serviceField.value = link.dataset.service;
      preview.hidden = true;
    });
  });

  // A draft only: nothing is sent to a server, stored in localStorage or submitted automatically.
  form.addEventListener('submit', event => {
    event.preventDefault();
    nameField.setCustomValidity(nameField.value.trim() ? '' : 'Bitte gib deinen Namen ein.');
    messageField.setCustomValidity(messageField.value.trim().length >= 10 ? '' : 'Bitte beschreibe deine Idee mit mindestens 10 Zeichen.');
    if (!form.reportValidity()) return;
    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const service = serviceField.value;
    currentDraft = `Hallo Christian,\n\nich interessiere mich für ${service}.\n\n${messageField.value.trim()}\n\nViele Grüße\n${name}\n\nRückantwort an: ${email}`;
    const subject = `Projektanfrage: ${service} – ${name}`;
    mailLink.href = `mailto:wchristian576@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(currentDraft)}`;
    output.textContent = currentDraft;
    status.textContent = '';
    preview.hidden = false;
    document.querySelector('#preview-title').focus({ preventScroll: true });
    preview.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'nearest' });
  });

  form.addEventListener('input', () => {
    nameField.setCustomValidity('');
    messageField.setCustomValidity('');
    // Never allow an old draft to be sent after the form has changed.
    preview.hidden = true;
    currentDraft = '';
  });

  document.querySelector('#copy-request').addEventListener('click', async () => {
    if (!currentDraft) return;
    try {
      await navigator.clipboard.writeText(currentDraft);
      status.textContent = 'Anfragetext kopiert. Du kannst ihn jetzt in deine E-Mail einfügen.';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(output);
      const selection = window.getSelection();
      selection.removeAllRanges(); selection.addRange(range);
      status.textContent = 'Der Text ist markiert. Kopiere ihn mit Strg+C oder nutze „Als Text speichern“.';
    }
  });

  document.querySelector('#download-request').addEventListener('click', () => {
    if (!currentDraft) return;
    const blob = new Blob([`Empfänger: wchristian576@gmail.com\n\n${currentDraft}\n`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'Brachial-Studio-Projektanfrage.txt';
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = 'Der Textdownload wurde gestartet. Die Anfrage wurde noch nicht versendet.';
  });
})();
