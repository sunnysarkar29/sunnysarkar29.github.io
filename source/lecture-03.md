# Lecture 3: Second-order dynamics, stability, and sinusoidal response

The pole locations of a second-order system encode its oscillation and decay. This lecture turns that observation into quantitative time-domain specifications, examines the effect of zeros, defines stability, and derives how a system responds to a sinusoidal input through its frequency response $G(j\omega)$.

## 1. Inverting the second-order step response

Start with the familiar second-order transfer function

$$G(s)=\frac{K\omega_n^2}{s^2+2\zeta\omega_n s+\omega_n^2},\qquad U(s)=\frac1s.$$

The step output is $Y(s)=G(s)/s$. For $0<\zeta<1$, the denominator's quadratic factor has poles $-\zeta\omega_n\pm j\omega_d$, with $\omega_d=\omega_n\sqrt{1-\zeta^2}$. Partial fractions therefore produce a constant term and a pair of damped sinusoidal terms. The real-valued result is

$$\boxed{y(t)=K\left[1-e^{-\zeta\omega_n t}\left(\cos\omega_d t+\frac{\zeta}{\sqrt{1-\zeta^2}}\sin\omega_d t\right)\right].}$$

The factor $e^{-\zeta\omega_n t}$ makes the transient decay; the sine and cosine describe the oscillation. This expression is equivalent to the compact phase-shifted form

$$y(t)=K\left[1-\frac{e^{-\zeta\omega_n t}}{\sqrt{1-\zeta^2}}\sin\left(\omega_d t+\cos^{-1}\zeta\right)\right].$$

The oscillation frequency $\omega_d$ is smaller than the natural frequency $\omega_n$ whenever $\zeta>0$.

### Where the damped oscillation comes from

For $0<\zeta<1$, the roots of the characteristic polynomial are $p_{1,2}=-\zeta\omega_n\pm j\omega_d$, with $\omega_d=\omega_n\sqrt{1-\zeta^2}$. The natural response must therefore be a decaying sinusoid. In a unity-DC-gain second-order system, subtracting that transient from the final value $1$ produces the step response. A convenient representation is

$$y(t)=1-e^{-\zeta\omega_n t}\left[\cos(\omega_dt)+\frac{\zeta}{\sqrt{1-\zeta^2}}\sin(\omega_dt)\right].$$

Check $t=0$: the bracket equals one, so $y(0)=0$. Check $t\to\infty$: the exponential vanishes and $y\to1$. Those checks help catch sign errors when using inverse Laplace transforms. The oscillation is not added arbitrarily; it follows directly from the imaginary part of the poles.

## 2. Classifying the damping ratio

The characteristic roots are $s_{1,2}=-\zeta\omega_n\pm\omega_n\sqrt{\zeta^2-1}$. The qualitative behavior depends on $\zeta$:

| Damping ratio | Pole locations | Step-response character |
| --- | --- | --- |
| $\zeta<0$ | at least one pole in the right half-plane | unstable growth |
| $\zeta=0$ | purely imaginary conjugate poles | undamped oscillation |
| $0<\zeta<1$ | complex left-half-plane pair | oscillatory, decaying |
| $\zeta=1$ | repeated real negative pole | critically damped |
| $\zeta>1$ | two distinct real negative poles | overdamped, nonoscillatory |

A larger $\zeta$ is **not always faster**. Near critical damping the transient is usually quick without oscillation; very large damping makes one real pole approach the origin, creating a slow mode.

### Damping regimes describe distinct physical experiences

For $\zeta=0$, the ideal second-order system oscillates forever because nothing dissipates energy. For $0<\zeta<1$, oscillations decay. At $\zeta=1$, the two real poles coincide and give the fastest non-oscillatory response within the standard fixed-$\omega_n$ family. For $\zeta>1$, there are two distinct negative real poles; one may become slow as $\zeta$ increases.

Try $\omega_n=4$: at $\zeta=0.5$, the poles are $-2\pm j3.46$; at $\zeta=1$, both are $-4$; at $\zeta=2$, the poles are approximately $-1.07$ and $-14.93$. The overdamped system is not automatically fastest—its slow pole can dominate for a long time. The categories assume the standard second-order model and should not be assigned to an arbitrary higher-order plant without inspecting its poles.

## 3. Quantitative step-response specifications

Let the final value be $y_{\infty}=K$ for a unit step and a stable system. Common specifications include the rise time $t_r$, peak time $t_p$, settling time $t_s$, and maximum percent overshoot $M_p$. They are meaningful only after defining the measurement convention, particularly for rise and settling times.

For a standard underdamped second-order system,

$$\boxed{t_p=\frac{\pi}{\omega_d}=\frac{\pi}{\omega_n\sqrt{1-\zeta^2}},}$$

$$\boxed{M_p=100\exp\left(-\frac{\zeta\pi}{\sqrt{1-\zeta^2}}\right)\%,}$$

and the common approximate two-percent settling-time expression is

$$\boxed{t_s\approx\frac{4}{\zeta\omega_n}.}$$

A rough rise-time rule for some underdamped second-order step responses is $t_r\approx 2/\omega_n$, but the coefficient depends on how rise time is defined and on $\zeta$. A better approximation is obtained directly from the step formula when precise limits are specified.

The percent-overshoot formula can be inverted to estimate damping from a required overshoot fraction $m=M_p/100$:

$$\boxed{\zeta=\frac{-\ln m}{\sqrt{\pi^2+(\ln m)^2}}.}$$

### Learn to use the specifications in both directions

For a standard underdamped step response, percent overshoot is $100\exp[-\pi\zeta/\sqrt{1-\zeta^2}]$. If overshoot must stay below $10\%$, solve for $\zeta$ rather than guessing: $\zeta\gtrsim0.591$. The common $2\%$ settling-time approximation is $t_s\approx4/(\zeta\omega_n)$, giving $\zeta\omega_n\gtrsim4/t_s$ for a desired settling deadline.

For a target $M_p\le10\%$ and $t_s\le2$ s, choose $\zeta\gtrsim0.591$ and $\zeta\omega_n\gtrsim2\,\mathrm{s}^{-1}$. If $\zeta=0.6$, a natural frequency of at least $3.33$ rad/s is suggested. These formulas assume a normalized second-order system with no significant extra poles or zeros. They are design approximations, not universal laws.

## 4. Pole regions encode time-domain requirements

A complex pole $s=-\sigma\pm j\omega_d$ has $\sigma=\zeta\omega_n$ and $\omega_n=\sqrt{\sigma^2+\omega_d^2}$. Thus a settling-time requirement roughly imposes a vertical boundary on the pole plane:

$$t_s\lesssim t_{s,\max}\quad\Longrightarrow\quad\operatorname{Re}(p)\lesssim-\frac4{t_{s,\max}}.$$

An overshoot requirement imposes a cone of allowed damping ratios. Poles farther to the left tend to be faster; poles closer to the real axis relative to their distance from the origin tend to have more damping. A pole location can be translated into a damping ratio using

$$\zeta=\frac{-\operatorname{Re}(p)}{|p|}.$$

These geometric constraints are central to both root-locus and frequency-domain controller design.

### Convert pole geometry into a design region

An overshoot limit translates into a minimum damping ratio, hence an angular wedge in the left-half $s$-plane. A settling-time limit translates into a vertical boundary: dominant poles should lie to the left of $\operatorname{Re}(s)=-4/t_s$ for the approximate $2\%$ rule. The intersection is the acceptable region for a second-order pole pair.

For example, $t_s<1$ s requires roughly $\operatorname{Re}(p)<-4$; $\zeta\ge0.7$ requires poles inside the corresponding damping-ratio wedge. A pole at $-5\pm j5$ has $\zeta=5/\sqrt{50}\approx0.707$ and satisfies both approximations. Pole locations are particularly useful in root-locus design because changing gain moves poles through these geometric regions.

## 5. Worked coefficient matching

Suppose a system has

$$G(s)=\frac{10}{s^2+2.5s+100}.$$

Comparing its denominator with $s^2+2\zeta\omega_n s+\omega_n^2$ gives $\omega_n=10$ rad/s and $2\zeta\omega_n=2.5$, so $\zeta=0.125$. The poles are

$$p_{1,2}=-1.25\pm j\sqrt{100-1.25^2}.$$

The predicted response is underdamped. Its approximate settling time is $4/(1.25)=3.2$ seconds, and the overshoot is obtained by substituting $\zeta=0.125$ into the $M_p$ formula. A direct unit-step simulation is a useful cross-check, especially if the transfer function has zeros or extra modes.

### Coefficient matching is a shortcut with prerequisites

Suppose the closed-loop transfer function is $T(s)=K/[s^2+6s+K]$ and we want to compare it with the standard second-order form. Matching coefficients gives $\omega_n^2=K$ and $2\zeta\omega_n=6$, hence $\omega_n=\sqrt K$ and $\zeta=3/\sqrt K$. The numerator equals $\omega_n^2$, so this is indeed the unity-DC-gain canonical form for positive $K$.

If $K=36$, then $\omega_n=6$, $\zeta=0.5$, $\omega_d\approx5.20$ rad/s, and $t_s\approx1.33$ s. Do not coefficient-match blindly when a transfer function has an extra zero or an output gain different from the canonical numerator. In that situation, the pole-based $\omega_n$ and $\zeta$ still describe a pole pair, but the textbook overshoot formula may fail.

## 6. Dominant poles and higher-order systems

A high-order system can have many poles, but not all may affect the observed response equally. When a pair of poles lies much closer to the imaginary axis than the remaining poles, its slower decay often dominates the transient. This motivates a second-order approximation.

More precisely, if $p_d$ is a dominant pole and another pole $p_f$ satisfies $|\operatorname{Re}(p_f)|\gg|\operatorname{Re}(p_d)|$, the latter's exponential decays much faster. The coefficient multiplying each mode also matters: a pole that is nearly canceled by a nearby zero may contribute very little to the measured output.

### Why slow poles dominate—and when they do not

The natural response of a stable higher-order system is a sum of modal terms. The term associated with the pole closest to the imaginary axis generally decays most slowly. If poles lie at $-1\pm j2$ and $-20$, the $-20$ mode fades quickly, leaving the slower oscillatory pair to govern most of the response.

However, dominance also depends on **residues**—how strongly each mode is excited and observed. A slow pole almost canceled by a nearby zero may contribute little to the measured output, while a fast pole with a huge residue may shape the early transient. A practical design rule is to use second-order approximations when non-dominant poles are several times farther left and no important zeros sit near the dominant pair, then verify the actual full-order step response.

## 7. How zeros alter a step response

A zero changes the way pole modes combine. For example, adding a left-half-plane zero to a second-order model can speed the initial rise yet increase overshoot. A right-half-plane zero can cause an **inverse response**: the output initially moves in the direction opposite its final value.

For a simple illustration, consider

$$G(s)=\frac{1-s/z}{(s+a)(s+b)},\qquad a,b,z>0.$$

The numerator vanishes at $s=z>0$, a right-half-plane zero. This imposes a fundamental limitation on how fast a stable tracking response can be achieved without substantial undershoot or overshoot. Canceling a right-half-plane zero with a controller pole would introduce an unstable internal mode, so such cancellations must not be treated as harmless algebra.

### Zeros can reshape the transient without moving its poles

Compare $T_1(s)=4/(s+2)^2$ with $T_2(s)=2(s+2)/(s+2)^2=2/(s+2)$. Algebraically, the latter cancels a pole and has a much simpler response. In physical systems, an approximate cancellation can still leave a small slow or unstable contribution. More generally, a left-half-plane zero near the dominant poles often speeds up the initial response and can increase overshoot.

A right-half-plane zero may create an **inverse response**: the output initially moves in the wrong direction before eventually moving toward its target. This nonminimum-phase behavior limits achievable bandwidth and makes aggressive tracking difficult. When a measured step response disagrees with a pole-only prediction, look for zeros before assuming the pole locations were computed incorrectly.

## 8. Stability of a continuous-time LTI system

For a finite-dimensional continuous-time LTI realization $\dot x=Ax+Bu$, **asymptotic internal stability** requires all eigenvalues of $A$ to lie strictly in the open left half-plane. For a minimal transfer function, this corresponds to all its poles having negative real part. Then the unforced modes decay to zero.

A right-half-plane pole gives an exponentially growing mode. A simple imaginary-axis pole may yield persistent oscillations; a repeated imaginary-axis pole can produce terms such as $te^{j\omega t}$ and unbounded growth. Therefore poles on the imaginary axis should not be casually classified as asymptotically stable.

A system can have a stable input-output transfer function while possessing hidden unstable dynamics after exact pole-zero cancellation. Internal stability is consequently stronger than just checking a reduced rational expression.

### Internal stability versus bounded-input bounded-output behavior

For a minimal rational transfer function, BIBO stability requires all poles in the open left-half plane. A transfer function with a simple pole on the imaginary axis produces a persistent oscillatory impulse response and is not BIBO-stable; a pole at the origin corresponds to an integrator, which turns a bounded step into an unbounded ramp.

But transfer-function cancellation can hide internal unstable dynamics. For example, a nonminimal realization might contain an unstable unobservable mode even if the visible transfer function looks stable. This is why control design normally distinguishes the internal dynamics of the closed loop from a single input-output ratio. In state-space form, asymptotic internal stability means the state matrix's eigenvalues have strictly negative real parts.

## 9. Complex numbers as vectors and phasors

Frequency response relies on complex arithmetic. A complex number has rectangular form $z=a+jb$ and polar form $z=re^{j\theta}$, where

$$r=\sqrt{a^2+b^2},\quad\theta=\operatorname{atan2}(b,a),\quad e^{j\theta}=\cos\theta+j\sin\theta.$$

Multiplication adds angles and multiplies magnitudes:

$$r_1e^{j\theta_1}\cdot r_2e^{j\theta_2}=(r_1r_2)e^{j(\theta_1+\theta_2)}.$$

Division subtracts angles. Logarithms turn gain multiplication into addition, a major reason Bode plots use decibels.

### Complex exponentials simplify sinusoidal reasoning

Euler's formula is $e^{j\theta}=\cos\theta+j\sin\theta$. A sinusoidal input can therefore be written as the real part of $Ue^{j\omega t}$, where $U$ is a complex amplitude encoding both magnitude and phase. Multiplication by a complex number rotates and stretches the vector. The magnitude $|a+jb|=\sqrt{a^2+b^2}$ and angle $\arg(a+jb)=\operatorname{atan2}(b,a)$ are the key operations.

For example, multiplying by $1-j$ multiplies amplitude by $\sqrt2$ and shifts phase by $-45^\circ$. The negative phase means output peaks occur later than input peaks. Using $\operatorname{atan2}$ instead of the ordinary inverse tangent prevents wrong-quadrant phase errors, especially when frequency-response curves cross the negative real axis.

## 10. Deriving sinusoidal steady-state response

Apply the input $u(t)=\cos(\omega t)$ to a stable LTI system with transfer function $G(s)$. Its Laplace transform is $U(s)=s/(s^2+\omega^2)$. Hence

$$Y(s)=G(s)\frac{s}{(s-j\omega)(s+j\omega)}.$$

The inverse transform contains transient contributions from the poles of $G$ and permanent sinusoidal contributions from $\pm j\omega$. Stability makes the transients decay. Writing

$$G(j\omega)=|G(j\omega)|e^{j\phi(\omega)}$$

leads to the theorem

$$\boxed{y_{ss}(t)=|G(j\omega)|\cos\!\left(\omega t+\phi(\omega)\right).}$$

In other words, a stable LTI system does not change the input sinusoid's frequency. It changes its **amplitude** and **phase**. The function $G(j\omega)$ is the system's frequency response, obtained from the transfer function by setting $s=j\omega$, provided there is no pole at that frequency.

### Solve for the steady sinusoid once

For $\dot y+ay=bu$ with $a>0$, assume a complex input $u(t)=Ue^{j\omega t}$ and trial steady output $y(t)=Ye^{j\omega t}$. Substitution gives $(j\omega+a)Y=bU$, so

$$\frac{Y}{U}=G(j\omega)=\frac{b}{a+j\omega}.$$

The amplitude ratio is $b/\sqrt{a^2+\omega^2}$ for positive $b$ and the phase is $-\tan^{-1}(\omega/a)$. The full response also contains a decaying homogeneous transient $Ce^{-at}$, but after several time constants only the forced sinusoid remains. This trial-solution method is the direct physical explanation for evaluating transfer functions along the imaginary axis.

## 11. Why frequency response is a powerful design tool

Any suitable signal can be represented as a combination of frequencies. Knowing how an LTI system scales and delays each frequency gives a different view of the same dynamics as the transient pole picture. This is why Bode magnitude plots, Bode phase plots, Nyquist plots, and Nichols charts can all be used to reason about control. They are different representations of the same complex quantity $G(j\omega)$, not unrelated techniques.

### Why this leads naturally to Bode plots

Instead of testing a controller with one input waveform, excite it with sinusoids over many frequencies. At each frequency record **gain** (output amplitude divided by input amplitude) and **phase shift**. A Bode plot collects these two functions across a logarithmic frequency axis. Slow disturbances and reference commands typically occupy low frequencies, while sensor noise and neglected dynamics often matter at higher frequencies.

The resulting design intuition is powerful: we usually want large loop gain where tracking and disturbance rejection matter, and smaller loop gain where noise and uncertain dynamics are dangerous. Frequency-response methods do not replace time-domain simulation; they give a complementary way to predict the behavior and robustness of the same closed-loop system.


## Practice problems and worked solutions

### Problem 1 — Overshoot from damping ratio

A standard second-order closed loop has $\zeta=0.5$. Estimate percent overshoot.

**Worked solution.** $M_p=100e^{-\pi\zeta/\sqrt{1-\zeta^2}}\approx100e^{-1.814}\approx16.3\%$. This assumes the canonical unity-gain model without important extra zeros.

### Problem 2 — Find damping from pole locations

A dominant pole pair is at $-4\pm j3$. Estimate its natural frequency, damping ratio, and $2\%$ settling time.

**Worked solution.** $\omega_n=\sqrt{4^2+3^2}=5$ rad/s, $\zeta=4/5=0.8$, and $t_s\approx4/(\zeta\omega_n)=1$ s.

### Problem 3 — Predict a sinusoidal output

For $G(s)=2/(s+2)$ and input $u(t)=3\cos(2t)$, give the steady output.

**Worked solution.** $G(j2)=2/(2+j2)$ has magnitude $1/\sqrt2$ and phase $-45^\circ$. Therefore $y_{ss}(t)=(3/\sqrt2)\cos(2t-45^\circ)$.



## Exam mastery — Second-order design from measured peaks

### Derive the overshoot formula instead of memorizing it

For $0<\zeta<1$, write poles as $s=-\zeta\omega_n\pm j\omega_d$, $\omega_d=\omega_n\sqrt{1-\zeta^2}$. The unit-step response of the normalized plant is

$$y(t)=1-e^{-\zeta\omega_nt}\left(\cos\omega_dt+\frac{\zeta}{\sqrt{1-\zeta^2}}\sin\omega_dt\right).$$

Differentiate and set $y'(t)=0$: the first nonzero peak occurs at $t_p=\pi/\omega_d$. Substitute it into $y(t)$, noting $\sin\pi=0$ and $\cos\pi=-1$, to obtain

$$\boxed{M_p=e^{-\zeta\omega_n t_p}=\exp\!\left(-\frac{\pi\zeta}{\sqrt{1-\zeta^2}}\right).}$$

Inverting gives $\zeta=-\ln M_p/\sqrt{\pi^2+(\ln M_p)^2}$. Then $\omega_n=\pi/[t_p\sqrt{1-\zeta^2}]$. This is precisely the derivation behind the final exam's response-identification problem. **Subtract the time at which the step was applied before calculating $t_p$.**

### Damping envelopes and settling

The oscillatory terms are multiplied by $e^{-\zeta\omega_n t}$, so the 2% envelope threshold roughly solves $e^{-\zeta\omega_n t}\approx0.02$. Since $-\ln(0.02)=3.912$, the popular rule is $t_s(2\%)\approx4/(\zeta\omega_n)$. This is an estimate based on the exponential envelope; it does not account exactly for the phase of the oscillation or important zeros.

### Why a good damping-ratio pole location may still overshoot badly

A controller can move poles into a damping region but also create a zero that changes the step residues. For the Homework 8 lead controller $C=K(s+5)/(s+50)$, the closed-loop numerator retains $(s+5)$. At $K\approx65$, the complex poles have $\zeta\approx0.594$, nominally consistent with 10% second-order overshoot, yet the exact third-order step overshoots by roughly 63%. You must simulate the **complete** $T(s)$ after using pole-damping lines for preliminary design.

**Practice.** An input step of 4 produces final output 2, first peak 2.8 at 1.9 seconds after excitation. Estimate $K=0.5$, $M_p=0.4$, $\zeta\approx0.28$, $\omega_d\approx1.65$ rad/s and $\omega_n\approx1.72$ rad/s. Finish by checking the predicted Bode resonance and the pole locations.



---

<!-- Exam-ready derivation lab — HTML supplement; editable, preserved exactly as on the web page. -->

<section class="mastery-lab" id="deep-derivation"><p class="lab-kicker">Read poles from data</p><h2>Derivation lab: infer damping and natural frequency from a step plot</h2>
<p>For a standard underdamped second-order system, <span class="math">\(G(s)=K\omega_n^2/(s^2+2\zeta\omega_ns+\omega_n^2)\)</span>. A step of amplitude <span class="math">\(A\)</span> settles at <span class="math">\(y_\infty=KA\)</span>, provided the system is stable. Read the first peak <span class="math">\(y_p\)</span> and the time difference <span class="math">\(t_p\)</span> between the step and peak:</p>
<div class="math-block">\[M_p=\frac{y_p-y_\infty}{|y_\infty-y(0^-)|},\qquad M_p=e^{-\pi\zeta/\sqrt{1-\zeta^2}}.\]</div>
<p>Take natural logarithms and isolate <span class="math">\(\zeta\)</span>:</p>
<div class="math-block">\[\ln M_p=-\frac{\pi\zeta}{\sqrt{1-\zeta^2}}\quad\Rightarrow\quad\boxed{\zeta=\frac{-\ln M_p}{\sqrt{\pi^2+(\ln M_p)^2}}}.\]</div>
<p>The damped frequency satisfies <span class="math">\(\omega_d=\pi/t_p=\omega_n\sqrt{1-\zeta^2}\)</span>, giving <span class="math">\(\omega_n=\pi/(t_p\sqrt{1-\zeta^2})\)</span>. Use this only when the plot is well-described by a dominant second-order mode and has no major zeros, delay, or other dominant poles.</p>
<details class="quick-check"><summary>What should you compute first if the step amplitude is four, not one?</summary><p>Divide the final output change by four to estimate the DC gain. Overshoot is measured relative to the output’s own final change, not relative to the input amplitude.</p></details><p class="exam-link">Apply to <a href="final.html">Final Problem 1</a> and <a href="midterm.html">Midterm Problem 2</a>.</p></section>
