// Run this once: node write_frontend.js
// It writes the upgraded index.html to public/index.html
const fs = require('fs');
const path = require('path');

const html = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Adithya Avusula — Aspiring Software Engineer & AI/LLM Developer. Portfolio showcasing full-stack web development and AI projects." />
    <meta name="author" content="Adithya Avusula" />
    <meta name="google-site-verification" content="nVwtiAlaAqcs12gju2a27_qQEIfaVhw8DUZ_MoNnfX0" />
    <meta property="og:title" content="Adithya Avusula | Software Engineer & AI/LLM Developer" />
    <meta property="og:description" content="Full-Stack Developer & AI/LLM Innovator crafting premium digital experiences." />
    <meta property="og:type" content="website" />
    <title>Adithya Avusula | Software Engineer & AI/LLM Developer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans:['Outfit','Inter','system-ui','sans-serif'], mono:['JetBrains Mono','monospace'] },
                    colors: {
                        brand:{50:'#ecfeff',100:'#cffafe',200:'#a5f3fc',300:'#67e8f9',400:'#22d3ee',500:'#06b6d4',600:'#0891b2',700:'#0e7490',800:'#155e75',900:'#164e63'},
                        ink:{50:'#f8fafc',100:'#f1f5f9',200:'#e2e8f0',400:'#94a3b8',600:'#475569',700:'#334155',800:'#1e293b',900:'#0f172a',950:'#020617'},
                    },
                    boxShadow:{glow:'0 0 30px -5px rgba(34,211,238,0.4)','glow-lg':'0 0 60px -10px rgba(34,211,238,0.35)',card:'0 25px 50px -12px rgba(0,0,0,0.6)'},
                    animation:{float:'float 7s ease-in-out infinite','fade-in-up':'fadeInUp 0.9s ease-out forwards','fade-in':'fadeIn 0.7s ease-out forwards'},
                    keyframes:{
                        float:{'0%,100%':{transform:'translateY(0px)'},'50%':{transform:'translateY(-20px)'}},
                        fadeInUp:{'0%':{opacity:'0',transform:'translateY(40px)'},'100%':{opacity:'1',transform:'translateY(0)'}},
                        fadeIn:{'0%':{opacity:'0'},'100%':{opacity:'1'}},
                    },
                },
            },
        };
    </script>
    <style>
        html{scroll-padding-top:80px}
        body{font-family:'Outfit','Inter',sans-serif;background-color:#020617;color:#e2e8f0;overflow-x:hidden}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0f172a}::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#06b6d4,#a855f7);border-radius:3px}
        body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:.025;pointer-events:none;z-index:0}
        .blob{position:absolute;border-radius:50%;filter:blur(100px);opacity:.18;z-index:0;pointer-events:none}
        .gradient-text{background:linear-gradient(135deg,#22d3ee 0%,#a78bfa 50%,#f472b6 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
        .gradient-text-2{background:linear-gradient(135deg,#a78bfa,#f472b6);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
        .gradient-text-cyan{background:linear-gradient(135deg,#67e8f9,#22d3ee);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
        .glass{background:rgba(15,23,42,.55);backdrop-filter:blur(20px) saturate(1.5);-webkit-backdrop-filter:blur(20px) saturate(1.5);border:1px solid rgba(148,163,184,.08)}
        .glass-light{background:rgba(30,41,59,.4);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(148,163,184,.1)}
        .reveal{opacity:0;transform:translateY(40px);transition:opacity .9s cubic-bezier(.22,1,.36,1),transform .9s cubic-bezier(.22,1,.36,1)}
        .reveal.visible{opacity:1;transform:translateY(0)}
        .reveal-left{opacity:0;transform:translateX(-40px);transition:opacity .9s cubic-bezier(.22,1,.36,1),transform .9s cubic-bezier(.22,1,.36,1)}
        .reveal-left.visible{opacity:1;transform:translateX(0)}
        .reveal-right{opacity:0;transform:translateX(40px);transition:opacity .9s cubic-bezier(.22,1,.36,1),transform .9s cubic-bezier(.22,1,.36,1)}
        .reveal-right.visible{opacity:1;transform:translateX(0)}
        .delay-100{transition-delay:.1s}.delay-200{transition-delay:.2s}.delay-300{transition-delay:.3s}.delay-400{transition-delay:.4s}
        .nav-link{position:relative}.nav-link::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;background:linear-gradient(90deg,#22d3ee,#a78bfa);border-radius:2px;transition:width .3s ease}.nav-link:hover::after,.nav-link.active::after{width:100%}.nav-link.active{color:#22d3ee}
        .skill-card{position:relative;overflow:hidden;transition:all .4s cubic-bezier(.22,1,.36,1)}.skill-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(34,211,238,.05),transparent 60%);opacity:0;transition:opacity .4s}.skill-card:hover::before{opacity:1}.skill-card:hover{transform:translateY(-6px);border-color:rgba(34,211,238,.3)!important;box-shadow:0 20px 50px -15px rgba(34,211,238,.2)}
        .project-card{position:relative;overflow:hidden;transition:all .4s cubic-bezier(.22,1,.36,1);background:linear-gradient(135deg,rgba(30,41,59,.7),rgba(15,23,42,.8));border:1px solid rgba(148,163,184,.08)}.project-card:hover{transform:translateY(-8px) scale(1.01);border-color:rgba(34,211,238,.3)!important;box-shadow:0 30px 60px -15px rgba(0,0,0,.5),0 0 30px -10px rgba(34,211,238,.15)}
        .gradient-border{position:relative;background:linear-gradient(135deg,rgba(30,41,59,.8),rgba(15,23,42,.9))}.gradient-border::before{content:'';position:absolute;inset:-1px;border-radius:inherit;padding:1px;background:linear-gradient(135deg,rgba(34,211,238,.4),rgba(168,85,247,.4),rgba(244,114,182,.4));-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .4s}.gradient-border:hover::before{opacity:1}
        .mobile-menu{transform:translateX(100%);transition:transform .35s cubic-bezier(.22,1,.36,1)}.mobile-menu.open{transform:translateX(0)}
        .toast-enter{animation:toastIn .45s cubic-bezier(.22,1,.36,1) forwards}@keyframes toastIn{from{transform:translateX(120px) scale(.95);opacity:0}to{transform:translateX(0) scale(1);opacity:1}}.toast-exit{animation:toastOut .35s ease-in forwards}@keyframes toastOut{from{transform:translateX(0);opacity:1}to{transform:translateX(120px);opacity:0}}
        .progress-bar{position:relative;height:6px;background:rgba(148,163,184,.1);border-radius:3px;overflow:hidden}.progress-bar-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,#22d3ee,#a78bfa);transform:scaleX(0);transform-origin:left;transition:transform 1.2s cubic-bezier(.22,1,.36,1)}.reveal.visible .progress-bar-fill{transform:scaleX(1)}
        .form-input{width:100%;padding:.875rem 1.125rem;border-radius:.625rem;background:rgba(30,41,59,.5);border:1px solid rgba(148,163,184,.12);color:white;outline:none;transition:all .3s;font-family:'Outfit',sans-serif;font-size:.9375rem}.form-input::placeholder{color:#475569}.form-input:focus{border-color:rgba(34,211,238,.5);box-shadow:0 0 0 3px rgba(34,211,238,.08);background:rgba(30,41,59,.7)}.form-input.error{border-color:rgba(248,113,113,.6);box-shadow:0 0 0 3px rgba(248,113,113,.08)}
        .skill-tag{transition:all .25s}.skill-tag:hover{transform:translateY(-2px) scale(1.05)}
        .timeline-dot{animation:pulseDot 2s ease-in-out infinite}@keyframes pulseDot{0%,100%{box-shadow:0 0 0 0 rgba(6,182,212,.4)}50%{box-shadow:0 0 0 8px rgba(6,182,212,0)}}
        .orb{position:absolute;border-radius:50%;filter:blur(60px);pointer-events:none}
        .btn-primary{position:relative;overflow:hidden}.btn-primary::after{content:'';position:absolute;top:-50%;left:-75%;width:50%;height:200%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);transform:skewX(-20deg);transition:left .6s}.btn-primary:hover::after{left:125%}
        .contact-card{transition:all .35s cubic-bezier(.22,1,.36,1)}.contact-card:hover{transform:translateX(6px);border-color:rgba(34,211,238,.35)!important}
        .grid-pattern{background-image:linear-gradient(rgba(148,163,184,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,.03) 1px,transparent 1px);background-size:40px 40px}
        .section-divider{width:60px;height:3px;background:linear-gradient(90deg,#22d3ee,#a78bfa);border-radius:2px;margin:.75rem auto 0}
        .typed-cursor{display:inline-block;width:2px;height:1em;background:#22d3ee;margin-left:2px;vertical-align:text-bottom;animation:blink .75s step-end infinite}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        #particles-canvas{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:.4}
    </style>
</head>
<body class="antialiased">

<canvas id="particles-canvas" aria-hidden="true"></canvas>

<div aria-hidden="true" class="fixed inset-0 -z-10 overflow-hidden">
    <div class="blob bg-cyan-500 w-[500px] h-[500px] -top-32 -left-32 animate-float"></div>
    <div class="blob bg-purple-600 w-[500px] h-[500px] top-1/3 -right-32 animate-float" style="animation-duration:11s;animation-delay:2.5s"></div>
    <div class="blob bg-pink-500 w-[400px] h-[400px] bottom-0 left-1/3 animate-float" style="animation-duration:5s;animation-delay:5s"></div>
    <div class="blob bg-indigo-500 w-[300px] h-[300px] top-2/3 left-10 animate-float" style="animation-delay:3s"></div>
</div>

<!-- NAVBAR -->
<header id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <a href="#home" class="flex items-center gap-2.5 group" aria-label="Home">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center font-bold text-white text-lg shadow-glow group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">A</div>
            <span class="font-bold text-lg text-white tracking-tight">Adithya<span class="gradient-text-cyan">.dev</span></span>
        </a>
        <ul class="hidden lg:flex items-center gap-8">
            <li><a href="#about"     class="nav-link text-sm font-medium text-ink-200 hover:text-brand-400 transition-colors pb-1">About</a></li>
            <li><a href="#skills"    class="nav-link text-sm font-medium text-ink-200 hover:text-brand-400 transition-colors pb-1">Skills</a></li>
            <li><a href="#projects"  class="nav-link text-sm font-medium text-ink-200 hover:text-brand-400 transition-colors pb-1">Projects</a></li>
            <li><a href="#education" class="nav-link text-sm font-medium text-ink-200 hover:text-brand-400 transition-colors pb-1">Education</a></li>
            <li><a href="#contact"   class="nav-link text-sm font-medium text-ink-200 hover:text-brand-400 transition-colors pb-1">Contact</a></li>
        </ul>
        <div class="hidden lg:flex items-center gap-4">
            <a href="https://github.com/adithyaavusula-ai" target="_blank" rel="noopener" aria-label="GitHub" class="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-ink-400 hover:text-brand-400 transition-all"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.78.12 3.07.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.77 1.05.77 2.12v3.14c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg></a>
            <a href="https://www.linkedin.com/in/adithya-avusula-a56483412" target="_blank" rel="noopener" aria-label="LinkedIn" class="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-ink-400 hover:text-brand-400 transition-all"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg></a>
            <a href="#contact" class="btn-primary px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-brand-500 to-cyan-400 hover:from-brand-400 hover:to-cyan-300 text-ink-950 transition-all shadow-glow hover:scale-105">Hire Me</a>
        </div>
        <button id="menuToggle" aria-label="Toggle navigation" aria-expanded="false" class="lg:hidden w-10 h-10 rounded-xl glass-light flex items-center justify-center text-ink-200 hover:text-brand-400 transition-all">
            <svg id="iconOpen" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            <svg id="iconClose" class="w-5 h-5 hidden" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
    </nav>
</header>

<div id="mobileMenu" class="mobile-menu fixed top-0 right-0 h-full w-80 z-50 p-8 lg:hidden" style="background:rgba(9,14,29,0.97);backdrop-filter:blur(24px);border-left:1px solid rgba(148,163,184,0.08);">
    <button id="closeMenu" aria-label="Close menu" class="absolute top-6 right-6 w-10 h-10 rounded-xl glass-light flex items-center justify-center text-ink-200 hover:text-brand-400 transition-all"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
    <div class="flex items-center gap-2.5 mb-10"><div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center font-bold text-white">A</div><span class="font-bold text-white">Adithya<span class="gradient-text-cyan">.dev</span></span></div>
    <ul class="flex flex-col gap-2">
        <li><a href="#about"     class="mobile-link block px-4 py-3 rounded-xl text-ink-100 hover:text-brand-400 hover:bg-brand-500/10 transition-all font-medium">About</a></li>
        <li><a href="#skills"    class="mobile-link block px-4 py-3 rounded-xl text-ink-100 hover:text-brand-400 hover:bg-brand-500/10 transition-all font-medium">Skills</a></li>
        <li><a href="#projects"  class="mobile-link block px-4 py-3 rounded-xl text-ink-100 hover:text-brand-400 hover:bg-brand-500/10 transition-all font-medium">Projects</a></li>
        <li><a href="#education" class="mobile-link block px-4 py-3 rounded-xl text-ink-100 hover:text-brand-400 hover:bg-brand-500/10 transition-all font-medium">Education</a></li>
        <li><a href="#contact"   class="mobile-link block px-4 py-3 rounded-xl text-ink-100 hover:text-brand-400 hover:bg-brand-500/10 transition-all font-medium">Contact</a></li>
    </ul>
    <div class="mt-8 pt-8 border-t border-ink-800"><a href="#contact" class="mobile-link block w-full text-center py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-400 text-ink-950 font-semibold">Hire Me</a></div>
</div>
<div id="menuOverlay" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 hidden lg:hidden"></div>

<!-- HERO -->
<section id="home" class="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-20 overflow-hidden">
    <div class="orb w-96 h-96 bg-brand-500/20 top-1/4 -left-20 animate-float" aria-hidden="true"></div>
    <div class="orb w-72 h-72 bg-purple-500/15 bottom-1/4 -right-10 animate-float" style="animation-duration:11s;animation-delay:3s;" aria-hidden="true"></div>
    <div class="absolute inset-0 grid-pattern pointer-events-none" aria-hidden="true"></div>
    <div class="max-w-6xl mx-auto text-center relative z-10">
        <div class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass mb-8 animate-fade-in" style="border-color:rgba(6,182,212,.25)">
            <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
            <span class="text-xs font-mono text-emerald-300 font-medium tracking-wide">Available for Internships &amp; Collaborations</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-tight mb-5 animate-fade-in-up" style="font-family:'Outfit',sans-serif;">
            Hi, I'm <span class="gradient-text">Adithya Avusula</span>
        </h1>
        <div class="text-xl sm:text-2xl md:text-3xl text-ink-300 font-medium mb-6 h-10 flex items-center justify-center animate-fade-in" style="animation-delay:.3s">
            <span id="typed-text" class="font-mono text-brand-400"></span><span class="typed-cursor"></span>
        </div>
        <p class="text-base sm:text-lg md:text-xl text-ink-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style="animation-delay:.4s">
            Crafting modern digital experiences with clean code, intelligent systems, and a deep passion for building the future of human-AI interaction.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style="animation-delay:.55s">
            <a href="#projects" id="cta-projects" class="btn-primary group w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-400 hover:from-brand-400 hover:to-cyan-300 text-ink-950 font-semibold shadow-glow hover:scale-105 transition-all flex items-center justify-center gap-2">
                <svg class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                View My Work
            </a>
            <a href="#contact" id="cta-contact" class="group w-full sm:w-auto px-8 py-4 rounded-xl glass hover:text-white font-semibold transition-all flex items-center justify-center gap-2" style="color:#e2e8f0">
                <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                Get In Touch
            </a>
        </div>
        <div class="grid grid-cols-3 gap-6 sm:gap-10 max-w-lg mx-auto mt-20 pt-10 border-t border-ink-800/60 animate-fade-in-up" style="animation-delay:.7s">
            <div class="text-center cursor-default"><div class="text-3xl sm:text-4xl font-extrabold gradient-text mb-1" data-count="10" data-suffix="+">0+</div><div class="text-xs sm:text-sm text-ink-400 font-medium">Projects Built</div></div>
            <div class="text-center cursor-default"><div class="text-3xl sm:text-4xl font-extrabold gradient-text-2 mb-1">AI</div><div class="text-xs sm:text-sm text-ink-400 font-medium">LLM Focus</div></div>
            <div class="text-center cursor-default"><div class="text-3xl sm:text-4xl font-extrabold gradient-text mb-1">B.Tech</div><div class="text-xs sm:text-sm text-ink-400 font-medium">IT Student</div></div>
        </div>
    </div>
</section>

<!-- ABOUT -->
<section id="about" class="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div class="absolute inset-0 grid-pattern pointer-events-none opacity-50" aria-hidden="true"></div>
    <div class="max-w-6xl mx-auto relative z-10">
        <div class="text-center mb-16 reveal">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-mono text-brand-400 bg-brand-500/10 border border-brand-500/20 mb-4">// ABOUT ME</span>
            <h2 class="text-4xl sm:text-5xl font-extrabold text-white mb-4" style="font-family:'Outfit',sans-serif;">Get to Know Me</h2>
            <div class="section-divider"></div>
        </div>
        <div class="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            <div class="lg:col-span-2 flex justify-center reveal-left">
                <div class="relative">
                    <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-500 to-purple-600 blur-2xl opacity-35 scale-110"></div>
                    <div class="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl glass border border-ink-700/50 flex flex-col items-center justify-center overflow-hidden shadow-card">
                        <div class="absolute inset-0 grid-pattern opacity-40"></div>
                        <div class="relative text-8xl font-extrabold gradient-text z-10 select-none" style="font-family:'Outfit',sans-serif;">A</div>
                        <p class="relative text-sm font-mono text-ink-400 z-10 mt-2">Adithya.dev</p>
                        <div class="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-brand-500/50 rounded-tl-lg"></div>
                        <div class="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-brand-500/50 rounded-tr-lg"></div>
                        <div class="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-purple-500/50 rounded-bl-lg"></div>
                        <div class="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-purple-500/50 rounded-br-lg"></div>
                        <div class="absolute top-5 right-5 w-2 h-2 rounded-full bg-brand-400 animate-pulse"></div>
                        <div class="absolute bottom-5 left-5 w-2 h-2 rounded-full bg-purple-400 animate-pulse" style="animation-delay:1s"></div>
                    </div>
                    <div class="absolute -bottom-4 -right-4 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-brand-500 to-cyan-400 text-ink-950 font-bold text-sm shadow-glow flex items-center gap-2">🎓 B.Tech IT</div>
                    <div class="absolute -top-4 -left-4 px-4 py-2.5 rounded-2xl glass border border-purple-500/30 text-purple-300 font-mono text-xs flex items-center gap-2"><span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>Open to work</div>
                </div>
            </div>
            <div class="lg:col-span-3 space-y-5 reveal-right">
                <p class="text-lg text-ink-200 leading-relaxed">I'm a <span class="text-brand-400 font-semibold">B.Tech Information Technology student</span> at <span class="text-brand-400 font-semibold">MVSR Engineering College, Hyderabad</span> — passionate about engineering elegant software that solves real problems with impact.</p>
                <p class="text-ink-300 leading-relaxed">My expertise spans <span class="text-white font-medium">full-stack web development</span> (React, Next.js, Node.js, MongoDB) and the cutting edge of <span class="text-white font-medium">Large Language Models</span> — from RAG pipelines and prompt engineering to fine-tuning and vector search.</p>
                <p class="text-ink-300 leading-relaxed">When I'm not coding, I'm diving deep into <span class="text-brand-400">AI system design</span>, reading research papers, and contributing to open-source. My mission is to build intelligent, human-centered software with real-world impact.</p>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                    <div class="flex items-center gap-2 px-3 py-2.5 rounded-xl glass border border-ink-700/50 text-sm"><span class="text-lg">📍</span><span class="text-ink-200 font-medium">Hyderabad, India</span></div>
                    <div class="flex items-center gap-2 px-3 py-2.5 rounded-xl glass border border-ink-700/50 text-sm"><span class="text-lg">🎯</span><span class="text-ink-200 font-medium">Open to Roles</span></div>
                    <div class="flex items-center gap-2 px-3 py-2.5 rounded-xl glass border border-ink-700/50 text-sm"><span class="text-lg">🚀</span><span class="text-ink-200 font-medium">Fast Learner</span></div>
                    <div class="flex items-center gap-2 px-3 py-2.5 rounded-xl glass border border-ink-700/50 text-sm"><span class="text-lg">🤖</span><span class="text-ink-200 font-medium">AI Enthusiast</span></div>
                    <div class="flex items-center gap-2 px-3 py-2.5 rounded-xl glass border border-ink-700/50 text-sm"><span class="text-lg">💻</span><span class="text-ink-200 font-medium">Full-Stack Dev</span></div>
                    <div class="flex items-center gap-2 px-3 py-2.5 rounded-xl glass border border-ink-700/50 text-sm"><span class="text-lg">🌐</span><span class="text-ink-200 font-medium">Open Source</span></div>
                </div>
                <div class="flex flex-wrap gap-4 pt-4">
                    <a href="mailto:adithyaavusula@gmail.com" class="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-400 text-ink-950 font-semibold shadow-glow hover:scale-105 transition-all text-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>Email Me</a>
                    <a href="https://www.linkedin.com/in/adithya-avusula-a56483412" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-ink-700/50 hover:border-brand-500/40 text-ink-100 font-semibold hover:text-white transition-all text-sm"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>LinkedIn</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- SKILLS -->
<section id="skills" class="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none"></div>
    <div class="max-w-6xl mx-auto relative z-10">
        <div class="text-center mb-16 reveal">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 mb-4">// TECH STACK</span>
            <h2 class="text-4xl sm:text-5xl font-extrabold text-white mb-4" style="font-family:'Outfit',sans-serif;">Skills &amp; Expertise</h2>
            <div class="section-divider" style="background:linear-gradient(90deg,#a78bfa,#f472b6)"></div>
            <p class="text-ink-400 mt-6 max-w-xl mx-auto">Technologies and tools I use to turn ideas into production-ready reality.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="skill-card gradient-border p-6 rounded-2xl glass reveal delay-100">
                <div class="flex items-center gap-3 mb-5"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-600 flex items-center justify-center shadow-glow flex-shrink-0"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg></div><div><h3 class="text-lg font-bold text-white">Web Development</h3><p class="text-xs text-ink-400 font-mono">Frontend &amp; Backend</p></div></div>
                <div class="mb-5"><div class="flex justify-between text-xs text-ink-400 mb-1.5"><span>Proficiency</span><span class="text-brand-400 font-mono">92%</span></div><div class="progress-bar reveal"><div class="progress-bar-fill" style="width:92%"></div></div></div>
                <div class="flex flex-wrap gap-2"><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20 font-mono">HTML5</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20 font-mono">CSS3</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20 font-mono">JavaScript</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20 font-mono">TypeScript</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20 font-mono">React</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20 font-mono">Next.js</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20 font-mono">Node.js</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20 font-mono">Express.js</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20 font-mono">Tailwind</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20 font-mono">REST APIs</span></div>
            </div>
            <div class="skill-card gradient-border p-6 rounded-2xl glass reveal delay-200">
                <div class="flex items-center gap-3 mb-5"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></div><div><h3 class="text-lg font-bold text-white">AI &amp; LLMs</h3><p class="text-xs text-ink-400 font-mono">ML / Generative AI</p></div></div>
                <div class="mb-5"><div class="flex justify-between text-xs text-ink-400 mb-1.5"><span>Proficiency</span><span class="text-purple-400 font-mono">85%</span></div><div class="progress-bar reveal"><div class="progress-bar-fill" style="width:85%;background:linear-gradient(90deg,#a78bfa,#f472b6)"></div></div></div>
                <div class="flex flex-wrap gap-2"><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">Python</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">OpenAI API</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">Prompt Eng.</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">LangChain</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">Hugging Face</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">Vector DBs</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">RAG Systems</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">Fine-Tuning</span></div>
            </div>
            <div class="skill-card gradient-border p-6 rounded-2xl glass reveal delay-300">
                <div class="flex items-center gap-3 mb-5"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg></div><div><h3 class="text-lg font-bold text-white">Databases &amp; Tools</h3><p class="text-xs text-ink-400 font-mono">Data &amp; Infrastructure</p></div></div>
                <div class="mb-5"><div class="flex justify-between text-xs text-ink-400 mb-1.5"><span>Proficiency</span><span class="text-emerald-400 font-mono">80%</span></div><div class="progress-bar reveal"><div class="progress-bar-fill" style="width:80%;background:linear-gradient(90deg,#10b981,#14b8a6)"></div></div></div>
                <div class="flex flex-wrap gap-2"><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">MongoDB</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">PostgreSQL</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">Redis</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">Mongoose</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">Git / GitHub</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">Docker</span><span class="skill-tag px-2.5 py-1 text-xs rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">Linux CLI</span></div>
            </div>
        </div>
    </div>
</section>

<!-- PROJECTS -->
<section id="projects" class="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div class="absolute inset-0 grid-pattern pointer-events-none opacity-40" aria-hidden="true"></div>
    <div class="max-w-6xl mx-auto relative z-10">
        <div class="text-center mb-16 reveal">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-mono text-brand-400 bg-brand-500/10 border border-brand-500/20 mb-4">// PORTFOLIO</span>
            <h2 class="text-4xl sm:text-5xl font-extrabold text-white mb-4" style="font-family:'Outfit',sans-serif;">Featured Projects</h2>
            <div class="section-divider"></div>
            <p class="text-ink-400 mt-6 max-w-xl mx-auto">A curated selection of full-stack apps, AI tools, and research projects.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <article class="project-card rounded-2xl p-6 flex flex-col reveal delay-100 group"><div class="flex items-center justify-between mb-5"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-blue-600 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg></div><div class="flex items-center gap-2"><span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span><span class="text-xs font-mono text-emerald-400">Live</span></div></div><h3 class="text-xl font-bold text-white mb-2">AI Chat Companion</h3><p class="text-ink-400 text-sm mb-5 flex-grow leading-relaxed">GPT-4 powered chat assistant with streaming responses, conversation history, code highlighting, and a sleek React UI with dark/light mode.</p><div class="flex flex-wrap gap-2 mb-5"><span class="px-2.5 py-1 text-xs rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20 font-mono">React</span><span class="px-2.5 py-1 text-xs rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20 font-mono">OpenAI API</span><span class="px-2.5 py-1 text-xs rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20 font-mono">Node.js</span><span class="px-2.5 py-1 text-xs rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20 font-mono">MongoDB</span></div><div class="flex gap-4 pt-4 border-t border-ink-800/60"><a href="https://github.com/adithyaavusula-ai" target="_blank" rel="noopener" class="flex items-center gap-1.5 text-sm text-ink-400 hover:text-brand-400 transition-colors font-medium"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.78.12 3.07.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.77 1.05.77 2.12v3.14c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>Code</a><a href="#" class="flex items-center gap-1.5 text-sm text-ink-400 hover:text-brand-400 transition-colors font-medium"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>Live Demo</a></div></article>
            <article class="project-card rounded-2xl p-6 flex flex-col reveal delay-200 group"><div class="flex items-center justify-between mb-5"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></div><span class="px-2 py-1 text-xs font-mono rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">v1.0</span></div><h3 class="text-xl font-bold text-white mb-2">Smart Resume Analyzer</h3><p class="text-ink-400 text-sm mb-5 flex-grow leading-relaxed">LLM-powered tool that parses resumes, extracts key skills, matches job descriptions, and provides AI-driven ATS optimization feedback.</p><div class="flex flex-wrap gap-2 mb-5"><span class="px-2.5 py-1 text-xs rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">Python</span><span class="px-2.5 py-1 text-xs rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">LangChain</span><span class="px-2.5 py-1 text-xs rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">FastAPI</span><span class="px-2.5 py-1 text-xs rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">NLP</span></div><div class="flex gap-4 pt-4 border-t border-ink-800/60"><a href="https://github.com/adithyaavusula-ai" target="_blank" rel="noopener" class="flex items-center gap-1.5 text-sm text-ink-400 hover:text-brand-400 transition-colors font-medium"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.78.12 3.07.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.77 1.05.77 2.12v3.14c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>Code</a><a href="#" class="flex items-center gap-1.5 text-sm text-ink-400 hover:text-brand-400 transition-colors font-medium"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>Live Demo</a></div></article>
            <article class="project-card rounded-2xl p-6 flex flex-col reveal delay-300 group"><div class="flex items-center justify-between mb-5"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg></div><span class="px-2 py-1 text-xs font-mono rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">v2.1</span></div><h3 class="text-xl font-bold text-white mb-2">MERN E-Commerce Platform</h3><p class="text-ink-400 text-sm mb-5 flex-grow leading-relaxed">Full-stack MERN e-commerce with JWT auth, Redux cart management, Stripe payments, and a comprehensive admin dashboard for inventory and analytics.</p><div class="flex flex-wrap gap-2 mb-5"><span class="px-2.5 py-1 text-xs rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">MongoDB</span><span class="px-2.5 py-1 text-xs rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">Express</span><span class="px-2.5 py-1 text-xs rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">React</span><span class="px-2.5 py-1 text-xs rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">Stripe</span></div><div class="flex gap-4 pt-4 border-t border-ink-800/60"><a href="https://github.com/adithyaavusula-ai" target="_blank" rel="noopener" class="flex items-center gap-1.5 text-sm text-ink-400 hover:text-brand-400 transition-colors font-medium"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.78.12 3.07.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.77 1.05.77 2.12v3.14c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>Code</a><a href="#" class="flex items-center gap-1.5 text-sm text-ink-400 hover:text-brand-400 transition-colors font-medium"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>Live Demo</a></div></article>
        </div>
        <div class="text-center mt-14 reveal"><a href="https://github.com/adithyaavusula-ai" target="_blank" rel="noopener" class="btn-primary group inline-flex items-center gap-3 px-8 py-4 rounded-xl glass hover:text-white font-semibold transition-all" style="color:#e2e8f0"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.78.12 3.07.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.77 1.05.77 2.12v3.14c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>Explore All on GitHub<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></a></div>
    </div>
</section>

<!-- EDUCATION -->
<section id="education" class="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div class="max-w-4xl mx-auto relative z-10">
        <div class="text-center mb-16 reveal">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 mb-4">// EDUCATION</span>
            <h2 class="text-4xl sm:text-5xl font-extrabold text-white mb-4" style="font-family:'Outfit',sans-serif;">Academic Journey</h2>
            <div class="section-divider" style="background:linear-gradient(90deg,#a78bfa,#f472b6)"></div>
        </div>
        <div class="relative">
            <div class="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500 via-purple-500 to-pink-500/30" aria-hidden="true"></div>
            <div class="relative mb-12 pl-16 sm:pl-0 reveal">
                <div class="sm:grid sm:grid-cols-2 sm:gap-12"><div class="sm:text-right sm:pr-12 mb-4 sm:mb-0"><span class="inline-block px-3 py-1.5 text-xs font-mono rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/25">2026 — Present</span></div><div></div></div>
                <div class="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-2 w-5 h-5 rounded-full bg-brand-500 border-4 border-ink-950 timeline-dot shadow-glow"></div>
                <div class="mt-6 sm:ml-[50%] sm:pl-12"><div class="p-6 sm:p-8 rounded-2xl glass border border-ink-700/50 hover:border-brand-500/35 transition-all gradient-border"><div class="flex flex-wrap items-start justify-between gap-3 mb-4"><h3 class="text-xl font-bold text-white">B.Tech — Information Technology</h3><span class="px-2.5 py-1 text-xs font-mono rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 flex-shrink-0">Current</span></div><p class="text-brand-400 font-semibold mb-3 text-base">MVSR Engineering College, Hyderabad</p><p class="text-ink-400 text-sm mb-4 leading-relaxed">Premier engineering institution focused on producing industry-ready technologists. Exploring core CS fundamentals, modern web stacks, AI/LLM research, and building real-world projects from the ground up.</p><div class="flex flex-wrap gap-2"><span class="px-2.5 py-1 text-xs rounded-lg bg-ink-800/60 text-ink-200 border border-ink-700/50 font-mono">DSA &amp; Algorithms</span><span class="px-2.5 py-1 text-xs rounded-lg bg-ink-800/60 text-ink-200 border border-ink-700/50 font-mono">Web Engineering</span><span class="px-2.5 py-1 text-xs rounded-lg bg-ink-800/60 text-ink-200 border border-ink-700/50 font-mono">AI/ML</span><span class="px-2.5 py-1 text-xs rounded-lg bg-ink-800/60 text-ink-200 border border-ink-700/50 font-mono">DBMS</span><span class="px-2.5 py-1 text-xs rounded-lg bg-ink-800/60 text-ink-200 border border-ink-700/50 font-mono">OS &amp; Networks</span></div></div></div>
            </div>
            <div class="relative pl-16 sm:pl-0 reveal delay-300">
                <div class="sm:grid sm:grid-cols-2 sm:gap-12"><div class="sm:text-right sm:pr-12 mb-4 sm:mb-0"><span class="inline-block px-3 py-1.5 text-xs font-mono rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/25">2030 — Goal</span></div><div></div></div>
                <div class="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-2 w-5 h-5 rounded-full bg-purple-500 border-4 border-ink-950 border-dashed"></div>
                <div class="mt-6 sm:ml-[50%] sm:pl-12"><div class="p-6 sm:p-8 rounded-2xl glass border border-purple-500/20 border-dashed"><h3 class="text-xl font-bold text-white mb-3">The Goal 🚀</h3><p class="text-ink-400 text-sm leading-relaxed">To become a versatile Software Engineer specializing in AI-driven systems — contributing to impactful open-source, building products that shape the future of human-AI collaboration.</p></div></div>
            </div>
        </div>
    </div>
</section>

<!-- CONTACT -->
<section id="contact" class="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div class="absolute inset-0 grid-pattern pointer-events-none opacity-40" aria-hidden="true"></div>
    <div class="max-w-6xl mx-auto relative z-10">
        <div class="text-center mb-16 reveal">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-mono text-brand-400 bg-brand-500/10 border border-brand-500/20 mb-4">// GET IN TOUCH</span>
            <h2 class="text-4xl sm:text-5xl font-extrabold text-white mb-4" style="font-family:'Outfit',sans-serif;">Let's Work Together</h2>
            <div class="section-divider"></div>
            <p class="text-ink-400 mt-6 max-w-xl mx-auto">Have a project, idea, or just want to say hello? Drop a message and I'll respond promptly.</p>
        </div>
        <div class="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div class="lg:col-span-2 space-y-4 reveal-left">
                <a href="mailto:adithyaavusula@gmail.com" id="contact-email" class="contact-card flex items-center gap-4 p-5 rounded-2xl glass border border-ink-700/40 group"><div class="w-12 h-12 rounded-xl bg-brand-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-500/25 transition-colors border border-brand-500/20"><svg class="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></div><div><p class="text-xs text-ink-500 uppercase tracking-widest font-mono mb-0.5">Email</p><p class="text-white font-semibold text-sm break-all">adithyaavusula@gmail.com</p></div><svg class="w-4 h-4 text-ink-600 group-hover:text-brand-400 transition-colors ml-auto flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></a>
                <a href="tel:+919492793633" id="contact-phone" class="contact-card flex items-center gap-4 p-5 rounded-2xl glass border border-ink-700/40 group"><div class="w-12 h-12 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/25 transition-colors border border-purple-500/20"><svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg></div><div><p class="text-xs text-ink-500 uppercase tracking-widest font-mono mb-0.5">Phone</p><p class="text-white font-semibold text-sm">+91 94927 93633</p></div><svg class="w-4 h-4 text-ink-600 group-hover:text-brand-400 transition-colors ml-auto flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></a>
                <a href="https://github.com/adithyaavusula-ai" target="_blank" rel="noopener" id="contact-github" class="contact-card flex items-center gap-4 p-5 rounded-2xl glass border border-ink-700/40 group"><div class="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/25 transition-colors border border-emerald-500/20"><svg class="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.78.12 3.07.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.77 1.05.77 2.12v3.14c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg></div><div><p class="text-xs text-ink-500 uppercase tracking-widest font-mono mb-0.5">GitHub</p><p class="text-white font-semibold text-sm">@adithyaavusula-ai</p></div><svg class="w-4 h-4 text-ink-600 group-hover:text-brand-400 transition-colors ml-auto flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></a>
                <a href="https://www.linkedin.com/in/adithya-avusula-a56483412" target="_blank" rel="noopener" id="contact-linkedin" class="contact-card flex items-center gap-4 p-5 rounded-2xl glass border border-ink-700/40 group"><div class="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/25 transition-colors border border-blue-500/20"><svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg></div><div><p class="text-xs text-ink-500 uppercase tracking-widest font-mono mb-0.5">LinkedIn</p><p class="text-white font-semibold text-sm">Adithya Avusula</p></div><svg class="w-4 h-4 text-ink-600 group-hover:text-brand-400 transition-colors ml-auto flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></a>
            </div>
            <div class="lg:col-span-3 reveal-right">
                <form id="contactForm" novalidate class="p-7 sm:p-9 rounded-2xl glass border border-ink-700/40 space-y-5">
                    <div class="mb-6"><h3 class="text-xl font-bold text-white mb-1">Send a Message</h3><p class="text-sm text-ink-400">I'll get back to you within 24 hours.</p></div>
                    <div class="grid sm:grid-cols-2 gap-5">
                        <div><label for="name" class="block text-sm font-medium text-ink-300 mb-2">Full Name <span class="text-red-400">*</span></label><input type="text" id="name" name="name" required minlength="2" placeholder="John Doe" class="form-input" autocomplete="name"/><p class="error-msg text-xs text-red-400 mt-1.5 hidden"></p></div>
                        <div><label for="phone" class="block text-sm font-medium text-ink-300 mb-2">Phone Number <span class="text-red-400">*</span></label><input type="tel" id="phone" name="phone" required placeholder="+91 98765 43210" class="form-input" autocomplete="tel"/><p class="error-msg text-xs text-red-400 mt-1.5 hidden"></p></div>
                    </div>
                    <div><label for="email" class="block text-sm font-medium text-ink-300 mb-2">Email Address <span class="text-red-400">*</span></label><input type="email" id="email" name="email" required placeholder="you@example.com" class="form-input" autocomplete="email"/><p class="error-msg text-xs text-red-400 mt-1.5 hidden"></p></div>
                    <div><label for="subject" class="block text-sm font-medium text-ink-300 mb-2">Subject <span class="text-ink-500 font-normal">(optional)</span></label><input type="text" id="subject" name="subject" placeholder="Project collaboration, internship, freelance..." class="form-input"/></div>
                    <div><label for="message" class="block text-sm font-medium text-ink-300 mb-2">Message <span class="text-red-400">*</span></label><textarea id="message" name="message" rows="5" required minlength="10" placeholder="Tell me about your project, idea, or opportunity..." class="form-input resize-none"></textarea><p class="error-msg text-xs text-red-400 mt-1.5 hidden"></p></div>
                    <button id="submitBtn" type="submit" class="btn-primary w-full px-6 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-400 hover:from-brand-400 hover:to-cyan-300 text-ink-950 font-bold text-base shadow-glow hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100">
                        <span id="btnText">Send Message</span>
                        <svg id="btnArrow" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                        <svg id="btnSpinner" class="hidden w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>

<!-- FOOTER -->
<footer class="py-12 px-4 sm:px-6 lg:px-8 border-t border-ink-800/60">
    <div class="max-w-6xl mx-auto"><div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-3"><div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center font-bold text-white shadow-glow">A</div><div><span class="font-bold text-white text-lg" style="font-family:'Outfit',sans-serif;">Adithya<span class="gradient-text-cyan">.dev</span></span><p class="text-xs text-ink-500 font-mono">Full-Stack &amp; AI Developer</p></div></div>
        <p class="text-sm text-ink-500 text-center font-mono">&copy; <span id="year"></span> Adithya Avusula &mdash; Crafted with &#10084;&#65039; &amp; &#9749;</p>
        <div class="flex items-center gap-3">
            <a href="https://github.com/adithyaavusula-ai" target="_blank" rel="noopener" aria-label="GitHub" class="w-10 h-10 rounded-xl glass flex items-center justify-center text-ink-400 hover:text-brand-400 transition-all"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.78.12 3.07.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.77 1.05.77 2.12v3.14c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg></a>
            <a href="https://www.linkedin.com/in/adithya-avusula-a56483412" target="_blank" rel="noopener" aria-label="LinkedIn" class="w-10 h-10 rounded-xl glass flex items-center justify-center text-ink-400 hover:text-brand-400 transition-all"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg></a>
            <a href="mailto:adithyaavusula@gmail.com" aria-label="Email" class="w-10 h-10 rounded-xl glass flex items-center justify-center text-ink-400 hover:text-brand-400 transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></a>
        </div>
    </div></div>
</footer>

<div id="toastContainer" class="fixed bottom-6 right-4 z-[200] max-w-sm space-y-2" aria-live="polite"></div>

<script>
// PARTICLES
(function(){const c=document.getElementById('particles-canvas'),x=c.getContext('2d');let p=[],W,H;function resize(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;}window.addEventListener('resize',resize);resize();const COLS=['rgba(34,211,238,','rgba(168,85,247,','rgba(244,114,182,','rgba(52,211,153,'];class P{constructor(){this.reset();}reset(){this.x=Math.random()*W;this.y=Math.random()*H;this.r=Math.random()*1.5+.3;this.vx=(Math.random()-.5)*.3;this.vy=(Math.random()-.5)*.3;this.color=COLS[Math.floor(Math.random()*COLS.length)];}update(){this.x+=this.vx;this.y+=this.vy;if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset();}draw(){x.beginPath();x.arc(this.x,this.y,this.r,0,Math.PI*2);x.fillStyle=this.color+'0.6)';x.fill();}}for(let i=0;i<80;i++)p.push(new P());function animate(){x.clearRect(0,0,W,H);p.forEach(q=>{q.update();q.draw();});for(let i=0;i<p.length;i++)for(let j=i+1;j<p.length;j++){const dx=p[i].x-p[j].x,dy=p[i].y-p[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<100){x.beginPath();x.strokeStyle='rgba(34,211,238,'+(0.06*(1-d/100))+')';x.lineWidth=.5;x.moveTo(p[i].x,p[i].y);x.lineTo(p[j].x,p[j].y);x.stroke();}}requestAnimationFrame(animate);}animate();})();
// TYPED
(function(){const el=document.getElementById('typed-text');const ph=['Full-Stack Developer','AI/LLM Engineer','React Specialist','Node.js Builder','Open-Source Contributor'];let pi=0,ci=0,del=false;function type(){const p=ph[pi];if(!del){el.textContent=p.slice(0,++ci);if(ci===p.length){del=true;setTimeout(type,2000);return;}}else{el.textContent=p.slice(0,--ci);if(ci===0){del=false;pi=(pi+1)%ph.length;}}setTimeout(type,del?50:90);}type();})();
// YEAR
document.getElementById('year').textContent=new Date().getFullYear();
// NAVBAR
const nb=document.getElementById('navbar');function hs(){if(window.scrollY>40){nb.style.cssText='background:rgba(2,6,23,0.88);backdrop-filter:blur(24px);border-bottom:1px solid rgba(148,163,184,0.07);';}else nb.style.cssText='';}window.addEventListener('scroll',hs,{passive:true});hs();
// MOBILE MENU
const mt=document.getElementById('menuToggle'),mm=document.getElementById('mobileMenu'),cm=document.getElementById('closeMenu'),ov=document.getElementById('menuOverlay'),io=document.getElementById('iconOpen'),ic=document.getElementById('iconClose');
const op=()=>{mm.classList.add('open');ov.classList.remove('hidden');io.classList.add('hidden');ic.classList.remove('hidden');mt.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';};
const cl=()=>{mm.classList.remove('open');ov.classList.add('hidden');io.classList.remove('hidden');ic.classList.add('hidden');mt.setAttribute('aria-expanded','false');document.body.style.overflow='';};
mt.addEventListener('click',()=>mm.classList.contains('open')?cl():op());cm.addEventListener('click',cl);ov.addEventListener('click',cl);document.querySelectorAll('.mobile-link').forEach(l=>l.addEventListener('click',cl));
// SCROLL REVEAL
const ro=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target);}});},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>ro.observe(el));
// ACTIVE NAV
const secs=document.querySelectorAll('section[id]'),nls=document.querySelectorAll('.nav-link');
function sal(){const sy=window.scrollY+120;secs.forEach(s=>{if(sy>=s.offsetTop&&sy<s.offsetTop+s.offsetHeight){nls.forEach(l=>{l.classList.toggle('active',l.getAttribute('href')==='#'+s.id);});}});}window.addEventListener('scroll',sal,{passive:true});
// COUNTER
document.querySelectorAll('[data-count]').forEach(el=>{const t=parseInt(el.dataset.count),sf=el.dataset.suffix||'';const o=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;o.disconnect();let c=0;const inc=Math.ceil(t/40),ti=setInterval(()=>{c=Math.min(c+inc,t);el.textContent=c+sf;if(c>=t)clearInterval(ti);},40);},{threshold:.5});o.observe(el);});
// TOAST
const tc=document.getElementById('toastContainer');
function showToast(msg,type='success'){const t=document.createElement('div');const bg=type==='success'?'bg-emerald-500/95':'bg-red-500/90';const bc=type==='success'?'border-emerald-400/50':'border-red-400/50';const icon=type==='success'?'<svg class="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>':'<svg class="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01"/></svg>';t.className='toast-enter '+bg+' border '+bc+' backdrop-blur-xl text-white px-5 py-4 rounded-2xl shadow-2xl flex items-start gap-3';t.innerHTML=icon+'<p class="text-sm font-semibold leading-snug">'+msg+'</p><button onclick="this.parentElement.remove()" class="ml-auto flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>';tc.appendChild(t);setTimeout(()=>{t.classList.replace('toast-enter','toast-exit');setTimeout(()=>t.remove(),400);},5000);}
// CONTACT FORM
const cf=document.getElementById('contactForm'),sb=document.getElementById('submitBtn'),bt=document.getElementById('btnText'),ba=document.getElementById('btnArrow'),bs=document.getElementById('btnSpinner');
const sfe=(f,m)=>{const e=f.parentElement.querySelector('.error-msg');if(e){e.textContent=m;e.classList.remove('hidden');}f.classList.add('error');};
const cfe=(f)=>{const e=f.parentElement.querySelector('.error-msg');if(e)e.classList.add('hidden');f.classList.remove('error');};
cf.querySelectorAll('input,textarea').forEach(f=>f.addEventListener('input',()=>cfe(f)));
cf.addEventListener('submit',async(e)=>{
  e.preventDefault();let v=true;
  const nf=document.getElementById('name'),ef=document.getElementById('email'),pf=document.getElementById('phone'),mf=document.getElementById('message');
  [nf,ef,pf,mf].forEach(cfe);
  if(nf.value.trim().length<2){sfe(nf,'Please enter your full name (min. 2 characters).');v=false;}
  if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(ef.value.trim())){sfe(ef,'Please enter a valid email address.');v=false;}
  if(!/^[0-9+\\s\\-()]{7,15}$/.test(pf.value.trim())){sfe(pf,'Please enter a valid phone number (7-15 digits).');v=false;}
  if(mf.value.trim().length<10){sfe(mf,'Message must be at least 10 characters.');v=false;}
  if(!v)return;
  sb.disabled=true;bt.textContent='Sending...';ba.classList.add('hidden');bs.classList.remove('hidden');
  const payload={name:nf.value.trim(),email:ef.value.trim(),phone:pf.value.trim(),subject:document.getElementById('subject').value.trim(),message:mf.value.trim()};
  try{
    const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)});
    const d=await r.json().catch(()=>({}));
    if(r.ok){showToast('Message sent! Adithya will reply shortly.','success');cf.reset();}
    else showToast(d.message||'Something went wrong. Please try again.','error');
  }catch{showToast('Network error. Please email me directly.','error');}
  finally{sb.disabled=false;bt.textContent='Send Message';ba.classList.remove('hidden');bs.classList.add('hidden');}
});
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), html, 'utf8');
console.log('✅ public/index.html written successfully (' + html.length + ' bytes)');
