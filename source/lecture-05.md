# Lecture 5: Bandwidth, delay, and links between time and frequency domains

A well-designed controller must be fast enough to track its reference, but it cannot arbitrarily amplify high-frequency noise or ignore unmodeled dynamics. This lecture ties response speed to closed-loop bandwidth, explains how delays alter phase, reviews Nyquist and Nichols intuition, and returns to nonlinear modeling and block algebra.

## 1. Bandwidth means a useful range of response frequencies

Let $T(s)=Y(s)/R(s)$ be a closed-loop reference-to-output transfer function. For a conventional low-pass tracking loop, low-frequency reference changes should be followed closely, so $|T(j\omega)|\approx1$ at low $\omega$. At sufficiently high frequencies, the output can no longer follow the command as quickly. A common bandwidth convention defines $\omega_{BW}$ where

$$|T(j\omega_{BW})|=\frac{|T(0)|}{\sqrt 2},$$

or approximately $-3.01$ dB below the low-frequency gain. If the frequency response has resonance, multiple crossings, or a non-low-pass shape, this convention must be interpreted carefully.

High bandwidth usually gives faster tracking, but increasing bandwidth also challenges sensor noise, actuator limits, delays, and unmodeled resonances.

### Bandwidth is always attached to a specific transfer function

The word *bandwidth* often means the frequency where a low-pass transfer magnitude falls to $1/\sqrt2$ of its low-frequency magnitude (the $-3$ dB point). But the loop $L$, reference transfer $T$, and control transfer $CS$ can have very different bandwidths. State explicitly which one is being measured.

For $T(s)=10/(s+10)$, the closed-loop bandwidth is $10$ rad/s, or about $1.59$ Hz. A command containing significant frequency components far above that will be heavily attenuated and phase-shifted. High bandwidth is useful for fast tracking but demands faster actuation, greater sensor quality, and more accurate plant modeling. A single scalar bandwidth number does not describe resonance peaks or phase margins.

## 2. The first-order speed-bandwidth relationship

For a first-order closed-loop low-pass response,

$$T(s)=\frac{a}{s+a}=\frac1{1+s/a},\qquad a>0,$$

the step response is

$$y(t)=1-e^{-at}.$$

The approximate 10–90 percent rise time is $t_r\approx2.2/a$, while its $-3$ dB bandwidth is exactly $\omega_{BW}=a$. Hence, for this particular system,

$$\boxed{t_r\,\omega_{BW}\approx2.2.}$$

The inverse relationship is useful for estimating response speed, but it is **not a universal identity**: second-order resonance, zeros, and extra poles change the numerical constant.

### Derive the rise-time connection

For a first-order unity-gain model, $y(t)=1-e^{-t/\tau}$. The $10\%$ crossing occurs at $t_{10}=-\tau\ln(0.9)$ and the $90\%$ crossing at $t_{90}=-\tau\ln(0.1)$. Therefore the $10$–$90\%$ rise time is

$$t_r=t_{90}-t_{10}=\tau\ln9\approx2.20\tau.$$

Since $\omega_{BW}=1/\tau$, the product $t_r\omega_{BW}\approx2.20$. This is a result for a specific first-order system, **not a universal law** for oscillatory or higher-order plants. A lightly damped system may have a fast initial rise but large overshoot and long settling time; bandwidth alone cannot tell you whether the response is desirable.

## 3. The difference between tracking speed and excessive overshoot

For a second-order system, an increase in $\omega_n$ generally speeds up the response while holding damping fixed. Raising bandwidth without sufficient phase margin or damping, however, can cause ringing and overshoot. The lecture's plots emphasize that a bandwidth specification and a peak-overshoot specification should be checked together.

The approximate second-order rules remain useful:

$$t_s\approx\frac4{\zeta\omega_n},\qquad M_p=\exp\left(-\frac{\pi\zeta}{\sqrt{1-\zeta^2}}\right)\quad\text{(fraction)}.$$

These formulas are good design guides only when the closed-loop dynamics actually behave like a dominant second-order pair.

### A fast rise can still be a poor response

Suppose two controllers drive the same motor position from zero to one. Controller A reaches $90\%$ rapidly but overshoots to $1.5$ and rings for several seconds; controller B takes slightly longer to rise but settles smoothly. If the application is precision positioning, B may be preferable even though A looks faster initially.

This is why control specifications often combine rise time, overshoot, settling time, steady-state error, and maximum actuator effort. For a standard second-order approximation, increasing $\omega_n$ generally speeds the response while changing $\zeta$ affects overshoot. Yet a controller cannot usually change them independently in a fixed low-order architecture; stability margins and physical limits constrain the achievable combinations.

## 4. Time delay is an all-pass magnitude effect

A pure time delay $\tau$ acts as $y(t)=u(t-\tau)$ for a suitable causal input. Its Laplace transform is

$$G_d(s)=e^{-\tau s}.$$

On the imaginary axis,

$$\boxed{|G_d(j\omega)|=1,\qquad\arg G_d(j\omega)=-\omega\tau\ \text{radians}.}$$

Thus a delay does **not** change the Bode magnitude, but it creates ever-increasing phase lag as frequency increases. In degrees, the phase is $-180\omega\tau/\pi$. At crossover, this directly reduces the available phase margin by approximately $\omega_c\tau$ radians.

A delay can therefore destabilize a previously well-behaved feedback loop without changing its magnitude plot at all. This is one reason high bandwidth must be designed cautiously.

### Delay spends phase margin without changing amplitude

A pure delay $e^{-s\tau}$ becomes $e^{-j\omega\tau}$ on the imaginary axis. Its magnitude is exactly one, so the Bode magnitude plot alone cannot reveal it; its phase is $-\omega\tau$ radians. At $\omega=20$ rad/s with $\tau=0.05$ s, the delay contributes $-1$ rad, or about $-57.3^\circ$.

If the loop originally had $60^\circ$ phase margin at that crossover, adding this delay could nearly exhaust the margin. An approximate allowable additional delay is $\tau_{\max}\approx\phi_m/\omega_{gc}$ when $\phi_m$ is measured in radians, crossover stays roughly fixed, and no other effects intervene. This calculation explains why a controller that works on a fast bench computer might oscillate when network or computation delays are added.

## 5. Gain and phase in Nyquist and Nichols coordinates

In a Nyquist plot, multiplying the loop transfer function by positive real gain $k$ scales every complex point radially outward from the origin. Multiplying by a delay rotates each point clockwise by an amount that grows with frequency. Both transformations may cause the Nyquist curve to approach or cross the critical point $-1$.

A Nichols plot displays gain vertically and phase horizontally. A gain increase shifts a Nichols curve upward in decibels; a phase delay generally shifts the curve toward more-negative phase. This makes gain and phase tradeoffs visually immediate.

### Read complex-plane geometry quantitatively

If a loop point has magnitude $r$ and phase $\phi$, its Nyquist location is $re^{j\phi}$. Positive gain scaling multiplies the distance from the origin by the gain while leaving the angle unchanged. Additional time delay rotates the point clockwise by $\omega\tau$ at positive frequency, with a rotation that grows as frequency increases.

In a Nichols chart, those two changes become a vertical gain shift and a phase displacement, respectively. This is useful for interpreting robustness: uncertainty in gain moves the Nyquist locus radially, while delay consumes phase. The dangerous point remains $-1+0j$, because the closed-loop denominator is $1+L$.

## 6. A careful interpretation of open-loop and closed-loop transfer functions

For unity negative feedback with controller $C$ and plant $G$,

$$L=CG,\qquad T=\frac{L}{1+L},\qquad S=\frac1{1+L}.$$

Here $T$ describes how reference motion reaches the output, whereas $S$ describes the response to output-side disturbances and many model-sensitivity questions. The relation $S+T=1$ will become one of the most important identities in the course.

For large $|L|$, $T\approx1$ and $S\approx0$ if the loop is well away from the critical point $-1$. For small $|L|$, $T\approx L$ and $S\approx1$. A loop therefore normally aims for strong low-frequency gain and a controlled high-frequency roll-off.

### Identify the transfer path before predicting bandwidth

In unity negative feedback, the reference-to-output map is $T=L/(1+L)$ and the output-disturbance-to-output map is $S=1/(1+L)$. The same closed-loop poles appear in both, but their numerators differ. An input disturbance inserted before the plant reaches the output through $GS$, not simply through $S$.

For example, if $G=1/(s+1)$ and $C=K$, then $T=K/(s+1+K)$ and $S=(s+1)/(s+1+K)$. Even though the closed-loop reference response is low-pass, the sensitivity magnitude approaches one at high frequency. Do not call the *entire feedback system* a low-pass filter without saying which input and output are involved.

## 7. Nonlinear modeling revisited: an aerodynamic example

The lecture returns to a nonlinear plant whose dynamics involve an aerodynamic or speed-dependent force. The important procedure is not a particular numerical coefficient but the sequence of calculations: introduce a state vector, find operating points, compute Jacobian derivatives, and express the perturbation model as

$$\delta\dot x=A\delta x+B\delta u,\qquad \delta y=C\delta x+D\delta u.$$

For a representative two-state model $\dot x_1=-\alpha\sin x_1+x_2^2+u$, $\dot x_2=-\beta x_2+u$, the linearization around $(x_e,u_e)$ is

$$A=\begin{bmatrix}-\alpha\cos x_{1,e}&2x_{2,e}\\0&-\beta\end{bmatrix},\qquad B=\begin{bmatrix}1\\1\end{bmatrix}.$$

This illustrative example demonstrates what is being differentiated and evaluated; its numerical coefficients are not intended to reproduce a specific experimental plant.

### Why aerodynamic models are linearized at operating points

Aerodynamic lift and drag depend nonlinearly on speed, angle of attack, density, and control-surface deflection. For instance, dynamic pressure scales as $q=\tfrac12\rho V^2$. Expanding around nominal airspeed $V_e$ gives $\delta q\approx\rho V_e\delta V$ if density is fixed. The sensitivity to a small speed change therefore depends on the operating speed itself.

A linear model designed for slow flight may not predict fast-flight behavior accurately. Controllers are often designed at multiple operating points and scheduled as conditions change. The principle is identical to the simple Taylor expansion in Lecture 1: choose a meaningful equilibrium or trajectory, compute local slopes, and document where the approximation remains credible.

## 8. Tracking and disturbances in a more elaborate block diagram

Suppose a loop includes a reference feedforward term $F$, a feedback controller $C$, a plant $G$, an input disturbance $d_i$, and an output disturbance $d_o$. If the control input is $u=F r+C(r-y)$, then

$$y=G\big[Fr+C(r-y)+d_i\big]+d_o.$$

Rearrange to obtain

$$\boxed{Y=\frac{G(F+C)}{1+GC}R+\frac{G}{1+GC}D_i+\frac1{1+GC}D_o.}$$

The form exposes three distinct design objectives: tracking, actuator-side disturbance rejection, and output disturbance rejection. It also illustrates why drawing every disturbance arrow in the correct place is essential.

### Trace disturbances with signal equations

Suppose $y=G[u+d_i]+d_o$ and $u=C(r-y_m)$ with $y_m=y+n$. Rearranging gives

$$Y=TR+GS D_i+S D_o-TN,\qquad S=\frac1{1+CG},\quad T=\frac{CG}{1+CG}.$$

This one formula is a complete input/output map for the stated signal locations. It makes a useful thought experiment possible: a large $|L|$ at low frequency makes $|S|$ small, reducing output disturbance and error; meanwhile $T\approx1$, so measurement noise at those frequencies can appear almost directly with a minus sign at the output. At high frequency, if $|L|\ll1$, then $T\approx0$ and $S\approx1$.

## 9. A useful algebraic simplification: controller normalization

If a controller's numerator and denominator are both multiplied by the same nonzero constant, its transfer function does not change. For instance,

$$C(s)=\frac{K_p s+K_i}{s}=K_p+\frac{K_i}{s}$$

can be parameterized as $K_p(1+\omega_i/s)$ with $\omega_i=K_i/K_p$ when $K_p\ne0$. This factorization clarifies the controller's zero and its low-frequency integral action, which will become important in later loop-shaping designs.

### Multiplying by a nonzero constant is not a free physical operation

In block-diagram algebra, a controller written $C(s)=K\bar C(s)$ lets us study loop shape and overall gain separately: $L=K\bar C G$. Moving constant factors among blocks may preserve the *closed-loop reference-to-output transfer*, but it can alter intermediate actuator signals if the diagram represents physical hardware. For example, a sensor scaling factor moved into the controller changes how noise is interpreted unless the noise location and units are transformed consistently.

A robust workflow is to label units at every signal: volts, newtons, radians, meters, and so forth. Transfer functions are ratios between specified units. Algebraically equal closed-loop ratios are not necessarily equally implementable arrangements, especially when actuator saturation, sensor quantization, and noise are present.

## 10. Physical constraints behind frequency-domain design

Large low-frequency loop gain helps accuracy and disturbance rejection. Large high-frequency loop gain often amplifies measurement noise, and attempting to maintain very large gain at all frequencies may create instability. The plant's dynamics, unavoidable delays, actuator limitations, and nonminimum-phase zeros bound what is achievable.

In frequency-domain controller design, these are not isolated topics. **Bandwidth, rise time, overshoot, robustness, and control effort** all depend on the loop shape. The remaining lectures turn these tradeoffs into specifications and compensator-design methods.

### Bandwidth is limited by the real world

Sensors have finite bandwidth and noise floors; actuators have force, speed, and slew-rate limits; sampled controllers introduce latency; flexible structures have unmodeled resonances. Increasing gain or crossover frequency can eventually excite these neglected effects. This is why an elegant transfer function that predicts a very fast response may not be feasible as hardware.

When comparing designs, always inspect at least four curves: reference tracking, disturbance rejection, noise transmission, and control effort. A good controller meets the important requirements with margin to spare, rather than achieving the fastest possible idealized response. The frequency-domain formulas are most valuable when they help you identify *which constraint* will bind first.


## Practice problems and worked solutions

### Problem 1 — Speed and bandwidth

A first-order system has $\tau=0.2$ s. Find its $-3$ dB bandwidth and $10$–$90\%$ rise time.

**Worked solution.** $\omega_{BW}=1/\tau=5$ rad/s. The rise time is $t_r\approx2.20\tau=0.44$ s.

### Problem 2 — Delay consumes margin

What phase lag does a $0.03$ s delay add at $20$ rad/s?

**Worked solution.** The lag is $-\omega\tau=-0.6$ rad, or about $-34.4^\circ$. It changes phase but not magnitude.

### Problem 3 — Identify two disturbance paths

With $G=1/(s+1)$ and $C=3$, find output-disturbance and plant-input-disturbance transfers.

**Worked solution.** $L=3/(s+1)$, so $S=(s+1)/(s+4)$ and $GS=1/(s+4)$. The disturbance location changes the numerator even though both share the same closed-loop pole.



## Exam mastery — Translate time requirements into frequency language

### Why “fast response” is usually a bandwidth question

For the stable first-order closed-loop transfer $T(s)=\omega_b/(s+\omega_b)$, the unit-step response is $1-e^{-\omega_bt}$. Solve $y(t_{10})=0.1$ and $y(t_{90})=0.9$:

$$t_{10}=-\frac{\ln0.9}{\omega_b},\quad t_{90}=-\frac{\ln0.1}{\omega_b},\quad\boxed{t_r(10\text{–}90\%)=\frac{\ln9}{\omega_b}\approx\frac{2.20}{\omega_b}.}$$

Other rise-time definitions, damping ratios, and loop shapes lead to different constants. The frequent approximation $t_r\approx1.8/\omega_c$ is a practical rule of thumb, **not an identity**; always state which rise-time definition you use.

### Delay consumes phase margin without changing magnitude

A pure delay $e^{-s\tau}$ satisfies $|e^{-j\omega\tau}|=1$ and $\arg e^{-j\omega\tau}=-\omega\tau$. Thus a delayed loop can have the same Bode magnitude and gain crossover as the undelayed loop, yet less phase margin:

$$PM_{\rm delayed}=PM_{\rm original}-\omega_c\tau(180/\pi).$$

Homework 6 tests this directly: for $\tau=0.025$ s and $\omega_c\approx1.8$ rad/s, the reduction is only about $2.6^\circ$. If the controller were redesigned to cross at 10 rad/s, the same delay would cost $14.3^\circ$.

### Bandwidth is not the whole transient story

A resonant closed loop can have large high-frequency gain even when its nominal bandwidth seems respectable. The second-order transfer $T=100/(s^2+4s+100)$ has $\zeta=0.2$ and resonant magnitude $\approx2.55$ or $8.1$ dB. It can amplify sinusoidal commands and measurement noise near 9.6 rad/s. A prefilter can smooth **commands** but does not correct the internal sensor-noise feedback path. This is exactly the logic of Homework 3 Problem 5.



---

<!-- Exam-ready derivation lab — HTML supplement; editable, preserved exactly as on the web page. -->

<section class="mastery-lab" id="deep-derivation"><p class="lab-kicker">Time meets frequency</p><h2>Derivation lab: calculate the phase penalty of delay</h2>
<p>An input/output pure delay <span class="math">\(\tau\)</span> multiplies a transfer function by <span class="math">\(e^{-s\tau}\)</span>. For sinusoidal steady state,</p>
<div class="math-block">\[e^{-j\omega\tau}=\cos(\omega\tau)-j\sin(\omega\tau),\quad|e^{-j\omega\tau}|=1,\quad\angle e^{-j\omega\tau}=-\omega\tau.\]</div>
<p>Delay does not change the Bode magnitude; it adds frequency-dependent phase lag. If gain crossover is approximately <span class="math">\(\omega_c\)</span>, the phase-margin loss is <span class="math">\(\Delta PM\approx\omega_c\tau(180/\pi)\)</span> degrees. Homework 6 asks about <span class="math">\(\tau=0.025\)</span> s and rise time about 1 s. Using the class-style rough link <span class="math">\(\omega_c\approx1.8/t_r\)</span> gives</p>
<div class="math-block">\[\Delta PM\approx1.8(0.025)\frac{180}{\pi}=2.58^\circ.\]</div>
<p>This is below the 5-degree concern threshold <em>under the assumed crossover approximation</em>. If the true crossover exceeds <span class="math">\(5\pi/(180\tau)\approx3.49\)</span> rad/s, the penalty exceeds 5 degrees. Report the assumption whenever inferring crossover from rise time.</p>
<details class="quick-check"><summary>Why can the magnitude Bode plot look unchanged while the loop becomes unstable?</summary><p>The extra delay increases phase lag around crossover, potentially moving the Nyquist path toward or around <span class="math">\(-1\)</span> even with identical loop magnitude.</p></details><p class="exam-link">See <a href="homework-06.html">Homework 6, Problem 4</a>.</p></section>
