# Lecture 4: Bode plots, poles and zeros, and frequency-domain interpretation

Frequency-response plots let us read an LTI system's amplification and phase shift at every sinusoidal frequency. This lecture explains Bode, Nyquist, and Nichols representations and develops the building-block method for sketching the effect of gains, poles, and zeros before using software.

## 1. The same transfer function, viewed in frequency

Recall that the steady-state output for $u(t)=\cos\omega t$ is

$$y_{ss}(t)=|G(j\omega)|\cos\left(\omega t+\arg G(j\omega)\right).$$

The magnitude $|G(j\omega)|$ is the output-amplitude-to-input-amplitude ratio, and $\arg G(j\omega)$ is the phase shift. A phase of $-90^\circ$ means a lag of one-quarter of the sinusoid's period. For a frequency $\omega$ in rad/s, the corresponding ordinary frequency is $f=\omega/(2\pi)$ Hz.

A frequency response is evaluated at $s=j\omega$. In practice we plot $\omega>0$, since real-coefficient transfer functions satisfy $G(-j\omega)=\overline{G(j\omega)}$; negative frequencies are then redundant for Bode magnitude and phase.

### Compute one frequency-response point by hand

Consider $G(s)=10/(s+2)$. Evaluating at $s=j\omega$ gives $G(j\omega)=10/(2+j\omega)$. At $\omega=2$ rad/s, the magnitude is $10/\sqrt{2^2+2^2}=3.54$ and the phase is $-\tan^{-1}(2/2)=-45^\circ$. At very low frequency the magnitude tends to five and the phase tends to zero; at very high frequency the magnitude tends toward zero and phase approaches $-90^\circ$.

Every frequency-domain plot is a different picture of these *same complex values*. Bode shows magnitude and angle separately against frequency; Nyquist plots the real and imaginary parts together. The algebra is easiest if you work with a factored transfer function, because magnitudes multiply and phases add.

## 2. Three classical frequency-response plots

A **Bode plot** shows the magnitude and phase on separate graphs versus logarithmic frequency. The magnitude is usually given in decibels:

$$M_{\mathrm{dB}}(\omega)=20\log_{10}|G(j\omega)|.$$

A **Nyquist plot** traces the complex number $G(j\omega)$ in the complex plane. A **Nichols plot** traces gain in decibels against unwrapped phase in degrees. These descriptions contain the same frequency-response data, but each makes a different control-design question easier to visualize.

Positive decibels indicate amplification ($|G|>1$); zero decibels means unity gain; negative decibels indicate attenuation. For example, multiplying a gain by ten adds $20$ dB, whereas doubling it adds about $6.02$ dB.

### Three plots, one data set

A Bode plot is ideal for seeing the frequency range where gain rises or falls and where phase lag accumulates. A Nyquist plot is ideal for seeing how closely the loop approaches the critical point $-1$ and whether it encircles that point. A Nichols plot places phase on the horizontal axis and gain in decibels on the vertical axis, allowing performance contours to be overlaid.

To translate a Bode datum into Nyquist coordinates, compute $x=|G|\cos\phi$ and $y=|G|\sin\phi$. For a magnitude of $2$ and phase $-135^\circ$, the Nyquist point is about $(-1.414,-1.414)$. A common error is interpreting a Nichols phase angle as a real-axis coordinate: Nichols uses phase and log magnitude, not real and imaginary parts.

## 3. Why logarithmic plots are convenient

A transfer function built from first-order factors can be written

$$G(s)=K\frac{s^{n_z}}{s^{n_p}}\frac{\prod_i(1+s/z_i)}{\prod_k(1+s/p_k)},$$

where this representation assumes the off-origin break frequencies are positive real numbers for standard left-half-plane factors. Multiplication of magnitudes becomes addition in decibels:

$$20\log_{10}|G_1G_2|=20\log_{10}|G_1|+20\log_{10}|G_2|.$$

Similarly, phases add: $\arg(G_1G_2)=\arg G_1+\arg G_2$, with unwrapping as necessary. Thus a complicated Bode plot can be built by adding easy constituent plots.

### Why decibels make multiplication easy

The magnitude in decibels is $20\log_{10}|G(j\omega)|$. Cascaded blocks multiply in ordinary magnitude but **add in decibels**: $20\log_{10}|G_1G_2|=20\log_{10}|G_1|+20\log_{10}|G_2|$. A gain of ten is $20$ dB; a gain of one hundred is $40$ dB; a magnitude of one-half is approximately $-6.02$ dB.

One decade is a factor of ten in frequency; one octave is a factor of two. A first-order pole contributes an eventual slope of $-20$ dB/decade, which means a tenfold frequency increase beyond the corner roughly divides the magnitude by ten. Phase contributions also add, but must be unwrapped consistently across $\pm180^\circ$ boundaries.

## 4. Constant gains, integrators, and differentiators

A positive real constant gain $K$ contributes $20\log_{10}K$ dB at every frequency and zero phase. A negative sign contributes $-180^\circ$ (or $+180^\circ$) phase under a chosen continuous phase convention.

A simple integrator has

$$G(s)=\frac{1}{s},\qquad |G(j\omega)|=\frac1\omega,\qquad\arg G(j\omega)=-90^\circ.$$

Its magnitude drops by $20$ dB every time the frequency is multiplied by ten: the slope is $-20$ dB/decade. A double integrator $1/s^2$ has a $-40$ dB/decade slope and $-180^\circ$ phase. A differentiator $s$ has $+20$ dB/decade and $+90^\circ$ phase, but ideal differentiation is not physically robust at high frequency.

### Build a factor library

A positive gain $K$ contributes $20\log_{10}K$ dB and zero phase. A negative gain adds a $180^\circ$ phase reversal (under a consistent phase convention). The factor $1/s$ has magnitude $1/\omega$, slope $-20$ dB/decade, and phase $-90^\circ$. The factor $s$ has slope $+20$ dB/decade and phase $+90^\circ$.

Use these as building blocks. For $G(s)=5/[s(1+s/10)]$, the integrator sets the initial $-20$ dB/decade slope and $-90^\circ$ phase; the pole at $10$ rad/s makes the high-frequency slope $-40$ dB/decade and adds a further $-90^\circ$ of eventual lag. Proper controllers use filtered derivatives rather than unlimited positive high-frequency slope.

## 5. A first-order left-half-plane pole

Consider the pole factor

$$G_p(s)=\frac{1}{1+s/a},\qquad a>0.$$

Its exact magnitude and phase are

$$|G_p(j\omega)|=\frac{1}{\sqrt{1+(\omega/a)^2}},\qquad\angle G_p(j\omega)=-\tan^{-1}(\omega/a).$$

At $\omega\ll a$, the magnitude is approximately one and the phase approximately $0^\circ$. At the **break frequency** $\omega=a$, the magnitude is $1/\sqrt 2$, or about $-3.01$ dB, and the phase is $-45^\circ$. At $\omega\gg a$, the magnitude has a $-20$ dB/decade slope and the phase approaches $-90^\circ$.

The straight-line asymptotic Bode approximation follows the pre-break horizontal line and the post-break negative slope. It is very useful for understanding but should not replace the exact response near a corner when a tight stability margin matters.

### A first-order pole's corner is not an abrupt physical switch

The normalized factor $1/(1+j\omega/\omega_p)$ has magnitude $[1+(\omega/\omega_p)^2]^{-1/2}$. At $\omega=\omega_p$, its magnitude is $1/\sqrt2$, or $-3.01$ dB, and its phase is $-45^\circ$. One decade below the corner, the phase lag is only about $5.7^\circ$; one decade above, it is about $84.3^\circ$.

The straight-line Bode approximation is a drawing aid: flat magnitude before the pole, then $-20$ dB/decade after it. The exact transition is smooth. If a problem asks for accurate stability margins near crossover, use the exact expression rather than reading only the asymptotic sketch.

## 6. A first-order left-half-plane zero

For the factor

$$G_z(s)=1+\frac{s}{a},\qquad a>0,$$

the exact response is

$$|G_z(j\omega)|=\sqrt{1+(\omega/a)^2},\qquad\angle G_z(j\omega)=\tan^{-1}(\omega/a).$$

The asymptotic magnitude is flat before $a$ and increases at $+20$ dB/decade afterward. Its phase rises smoothly from $0^\circ$ to $+90^\circ$, passing $+45^\circ$ at $\omega=a$. Thus an ordinary left-half-plane zero tends to **increase** high-frequency gain and add phase lead.

The phase contribution of a right-half-plane zero $1-s/a$ is instead $-\tan^{-1}(\omega/a)$, even though its magnitude is identical to that of a left-half-plane zero. This is why the magnitude plot alone cannot reveal whether a system is minimum phase.

### A zero is approximately the mirror-image building block

A normalized left-half-plane zero $1+s/\omega_z$ gives magnitude $\sqrt{1+(\omega/\omega_z)^2}$ and positive phase $\tan^{-1}(\omega/\omega_z)$. Its high-frequency magnitude slope is $+20$ dB/decade, and at its corner it contributes $+3.01$ dB and $+45^\circ$.

A zero can compensate phase lag from a nearby pole, which is the principle behind lead compensation. But a zero is not automatically beneficial: increasing gain at high frequencies can amplify noise, and a right-half-plane zero contributes phase *lag* despite increasing magnitude. Always examine phase as well as slope when interpreting a zero.

## 7. Second-order factors and resonant peaks

A two-pole system in normalized form has

$$G_2(s)=\frac{\omega_n^2}{s^2+2\zeta\omega_n s+\omega_n^2}.$$

Its frequency-response magnitude is

$$|G_2(j\omega)|=\frac{\omega_n^2}{\sqrt{(\omega_n^2-\omega^2)^2+(2\zeta\omega_n\omega)^2}}.$$

At frequencies much larger than $\omega_n$, its magnitude decreases at $-40$ dB/decade and its phase approaches $-180^\circ$. For sufficiently low damping, the magnitude exhibits a resonance. In fact, when $0<\zeta<1/\sqrt2$,

$$\omega_r=\omega_n\sqrt{1-2\zeta^2},\qquad M_r=\frac{1}{2\zeta\sqrt{1-\zeta^2}}.$$

Resonance is a warning that the system amplifies inputs near a particular frequency and may ring strongly after a disturbance.

### Second-order resonance and damping

For $G(s)=\omega_n^2/(s^2+2\zeta\omega_ns+\omega_n^2)$, setting $s=j\omega$ gives a denominator with real part $\omega_n^2-\omega^2$ and imaginary part $2\zeta\omega_n\omega$. If $\zeta<1/\sqrt2$, the magnitude has a resonant peak at $\omega_r=\omega_n\sqrt{1-2\zeta^2}$.

For $\zeta=0.2$, the peak is pronounced and close to the natural frequency; for $\zeta=0.8$, the normalized low-pass response has no resonant peak above its DC value. After the second-order break, magnitude falls approximately $-40$ dB/decade and phase approaches $-180^\circ$. Resonance is often the frequency-domain signature of oscillatory time-domain behavior.

## 8. Poles and zeros in the right half-plane

A right-half-plane pole factor $1/(1-s/a)$ has the **same magnitude** as a corresponding left-half-plane pole factor $1/(1+s/a)$ but a different continuous phase response. Right-half-plane poles also signal open-loop instability; feedback design must account for them explicitly.

A right-half-plane zero $1-s/a$ has positive magnitude slope after the break but adds phase **lag**, not lead. An all-pass factor can preserve magnitude at every frequency while changing phase:

$$G_{ap}(s)=\frac{s-a}{s+a},\qquad |G_{ap}(j\omega)|=1\quad(a>0).$$

Thus no magnitude-only argument can determine the entire stability or phase behavior of a nonminimum-phase plant.

### Why a right-half-plane zero is difficult

Compare $1+s/a$ and $1-s/a$ for $a>0$. Their magnitudes at $s=j\omega$ are identical: $\sqrt{1+(\omega/a)^2}$. But the left-half-plane zero gives phase lead $+\tan^{-1}(\omega/a)$, while the right-half-plane zero gives phase lag $-\tan^{-1}(\omega/a)$. A magnitude-only measurement cannot distinguish them.

A right-half-plane pole also changes the phase behavior and destabilizes open-loop internal dynamics. This is why a magnitude Bode plot cannot by itself certify stability. In nonminimum-phase systems, pushing crossover too high often incurs severe phase loss, leaving little robustness margin. The safest first step is to factor the transfer function and explicitly mark which poles and zeros lie in the right half-plane.

## 9. Constructing a complex Bode plot by hand

To construct $G(s)$ systematically, first express every factor in a standard normalized form. Next mark the low-frequency gain, each zero and pole break frequency, and any poles or zeros at the origin. Begin with the initial slope; **add $20$ dB/decade for each first-order zero and subtract $20$ dB/decade for each first-order pole**. For repeated factors, multiply the slope change by multiplicity.

For example,

$$G(s)=\frac{10(1+s/5)}{s(1+s/10)(1+s/100)}$$

starts with an integrator slope of $-20$ dB/decade, changes to $0$ after the zero at $5$, changes to $-20$ after the pole at $10$, and changes to $-40$ after the pole at $100$. Its exact phase is the sum

$$\angle G(j\omega)=-90^\circ+\tan^{-1}(\omega/5)-\tan^{-1}(\omega/10)-\tan^{-1}(\omega/100).$$

A common sketching pitfall is to plot the transfer function's raw coefficient factors without first extracting the constant gain and corner frequencies. The initial magnitude level will then be wrong.

### A complete sketching procedure

For $G(s)=100(s+1)/[s(s+10)(s+100)]$, rewrite the factors in normalized form before sketching: $G(s)=0.1(1+s)/[s(1+s/10)(1+s/100)]$. The break frequencies are $1$, $10$, and $100$ rad/s. Below the first break the slope is $-20$ dB/decade due to the integrator; the zero at $1$ brings it to zero; the pole at $10$ restores $-20$; and the pole at $100$ makes it $-40$.

Build a slope table by moving from left to right; separately sum each factor's phase. Then evaluate the exact magnitude and phase at a few test frequencies, especially near the frequency where the curve crosses $0$ dB. The gain constant fixes the vertical offset—it does **not** change slopes or phase if it is positive.

## 10. Nyquist and Nichols plots from a Bode table

A small frequency table can be used to translate among plot types. For each chosen $\omega$, calculate or measure $|G(j\omega)|$ and $\phi=\arg G(j\omega)$. The Nyquist point is

$$G(j\omega)=|G(j\omega)|\cos\phi+j|G(j\omega)|\sin\phi.$$

The Nichols point is simply $(\phi,\,20\log_{10}|G(j\omega)|)$. For a real-rational system the negative-frequency Nyquist portion is the reflection of the positive-frequency curve across the real axis. The direction in which a curve is traced matters for the later Nyquist stability test.

### Convert points without losing their sequence

Suppose a Bode plot reports $|L|=1$ and $\arg L=-120^\circ$ at one frequency. The Nyquist coordinate is $(-0.5,-0.866)$. If the next frequency has $|L|=0.5$ and phase $-180^\circ$, the point is $(-0.5,0)$. Plot these in *increasing-frequency order* and connect them smoothly; direction of travel is essential when counting encirclements.

For systems with real coefficients, negative-frequency data are complex conjugates of positive-frequency data, so the complete Nyquist curve has mirror symmetry about the real axis under ordinary conditions. When the loop has poles on the imaginary axis, such as integrators, the contour must be modified rather than passing through those poles.

## 11. Gain and phase reveal familiar filtering behavior

A system that passes low frequencies but attenuates high frequencies is a **low-pass filter**; one that suppresses low frequencies but passes high frequencies is a **high-pass filter**. A band-pass filter passes a middle range, while a notch filter rejects a narrow interval of frequencies. The same gain/phase concepts describe both filters and control loops, but in feedback design we care not just about the plant transfer function itself: we also care how its gain and phase influence the closed-loop characteristic equation.

The term **bandwidth** is usually tied to the frequency range in which a specified transfer function maintains substantial gain. For many low-pass closed-loop systems it is the frequency where the magnitude has dropped by $3$ dB from its low-frequency level. A larger closed-loop bandwidth often implies faster tracking, but it may also expose the loop to noise and neglected high-frequency dynamics.

### Filtering vocabulary as transfer-function behavior

A low-pass filter transmits low frequencies and attenuates high frequencies; a high-pass filter does the opposite; a band-pass filter emphasizes a middle range. For $H(s)=\omega_c/(s+\omega_c)$, a sinusoid much slower than $\omega_c$ passes with nearly unit gain, while a sinusoid much faster is attenuated approximately by $\omega_c/\omega$.

In feedback design, the **complementary sensitivity** often behaves like a low-pass function for the reference and measurement noise, while **sensitivity** often behaves like a high-pass function for certain disturbance paths. But these are not universal filter labels: exact behavior depends on the loop and disturbance injection point. Always inspect the specific transfer function before naming its filtering effect.

## 12. Frequency-domain thinking prepares feedback design

An extra high-frequency plant pole changes the loop slope and decreases phase, even if it barely changes low-frequency tracking. A right-half-plane zero adds lag while increasing magnitude, making its behavior especially important. To use Bode plots for control, we will look for the frequency at which the **loop** magnitude crosses unity and compare its phase to $-180^\circ$.

### Use the plots to predict tradeoffs before tuning

For a typical negative-feedback system, high low-frequency loop gain reduces steady tracking error and rejects slowly varying disturbances. At high frequencies we often want the loop gain to fall, so high-frequency measurement noise is not strongly copied into the output and unmodeled dynamics do not destabilize the loop. The transition region around gain crossover has especially high leverage because it largely determines response speed and stability margin.

The design problem is therefore not simply to maximize gain. It is to **shape gain versus frequency** while keeping phase behavior safe. After choosing a tentative loop, check its Nyquist stability, time-domain response, disturbance transfer functions, and actuator effort together.


## Practice problems and worked solutions

### Problem 1 — One Bode point

For $G(s)=1/(1+s/10)$, evaluate gain in dB and phase at $\omega=10$ rad/s.

**Worked solution.** $|G(j10)|=1/\sqrt2$, giving $20\log_{10}(1/\sqrt2)=-3.01$ dB. The phase is $-45^\circ$.

### Problem 2 — Hand-drawn slopes

For $G(s)=10/[s(1+s/5)(1+s/50)]$, list asymptotic magnitude slopes below $5$, between $5$ and $50$, and above $50$ rad/s.

**Worked solution.** The integrator supplies $-20$ dB/decade initially. The pole at $5$ changes this to $-40$ dB/decade; the pole at $50$ changes it to $-60$ dB/decade.

### Problem 3 — Minimum phase matters

Do $1+s/4$ and $1-s/4$ have the same Bode magnitude?

**Worked solution.** Yes: both have magnitude $\sqrt{1+(\omega/4)^2}$. Their phases differ in sign. The right-half-plane zero contributes phase lag and can cause inverse-response behavior.



## Exam mastery — Build Bode, Nyquist, and Nichols from one complex number

### Derive a Bode plot factor by factor

Set $s=j\omega$ and factor $G(s)=K s^{-q}\prod(1+s/z_i)/\prod(1+s/p_i)$, multiplying by any second-order terms. The magnitude obeys $20\log_{10}|G|=20\log_{10}|K|-20q\log_{10}\omega+\sum20\log_{10}|1+j\omega/z_i|-\sum20\log_{10}|1+j\omega/p_i|$. The phase is a **signed sum** of factor angles. Real poles each contribute about $-90^\circ$ above break, real LHP zeros about $+90^\circ$, and an integrator adds constant $-90^\circ$.

A real RHP zero factor $(1-s/z)$ has **the same magnitude** as $(1+s/z)$ on $s=j\omega$, but its phase is negative: $\arg(1-j\omega/z)=-\tan^{-1}(\omega/z)$. This is why Homework 4's fourth plant is a deliberately nonminimum-phase trap.

### Nyquist is the complex-plane version of Bode

At each frequency $\omega$, $G(j\omega)=|G|e^{j\phi}$ gives the point $(\operatorname{Re}G,\operatorname{Im}G)=(|G|\cos\phi,|G|\sin\phi)$. You cannot independently choose its Bode magnitude, Bode phase, and Nyquist trajectory; they are the same complex function viewed differently. A Nichols plot records the same pair $(\phi,20\log_{10}|G|)$ with frequency as an implicit parameter.

**Worked factor check:** $G=2.5/(s^2+3s+25)$ has $G(0)=0.1$ ($-20$ dB). At $\omega=5$, $G(j5)=2.5/(j15)=-j/6$, so magnitude is $1/6$ ($-15.56$ dB) and phase exactly $-90^\circ$. Its Nyquist point at that frequency is $(0,-1/6)$, and Nichols point $(-90^\circ,-15.56\text{ dB})$.

### The integrator trap

If $G(j\omega)\sim K/(j\omega)$ near zero, Nyquist does **not** start at a finite real DC gain. It heads to imaginary infinity, so your sketch must show its approach and orientation. The full Nyquist stability contour also indents around imaginary-axis poles; a one-sided frequency-response graph is useful for margins but cannot always supply the full winding count by itself.



---

<!-- Exam-ready derivation lab — HTML supplement; editable, preserved exactly as on the web page. -->

<section class="mastery-lab" id="deep-derivation"><p class="lab-kicker">Sketch and verify</p><h2>Derivation lab: Bode, Nyquist, and Nichols describe one function</h2>
<p>Take the Homework 4 plant <span class="math">\(G(s)=2.5/(s^2+3s+25)\)</span>. Evaluate it on the imaginary axis, retaining real and imaginary parts:</p>
<div class="math-block">\[G(j\omega)=\frac{2.5}{25-\omega^2+j3\omega}.\]</div>
<p>Its magnitude and unwrapped phase are</p>
<div class="math-block">\[|G(j\omega)|=\frac{2.5}{\sqrt{(25-\omega^2)^2+9\omega^2}},\qquad\phi(\omega)=-\operatorname{atan2}(3\omega,25-\omega^2).\]</div>
<p>For the Bode plot, graph <span class="math">\(20\log_{10}|G|\)</span> and <span class="math">\(\phi\)</span> versus logarithmic frequency. For the one-sided Nyquist plot, graph the Cartesian coordinates <span class="math">\((\Re G,\Im G)\)</span> for <span class="math">\(\omega\ge0\)</span>. For the Nichols plot, graph phase on the horizontal axis against magnitude in dB on the vertical axis. These are coordinate transformations of the same complex response, so their resonant features must agree.</p>
<details class="quick-check"><summary>What happens at \(\omega=0\) and \(\omega\to\infty\)?</summary><p>The initial Nyquist point is <span class="math">\(G(0)=0.1\)</span> on the positive real axis; at high frequency the magnitude falls like <span class="math">\(2.5/\omega^2\)</span> and the phase approaches <span class="math">\(-180^\circ\)</span>.</p></details><p class="exam-link">Compare the three plots in <a href="homework-04.html">Homework 4, Problems 1–4</a>.</p></section>
