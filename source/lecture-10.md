# Lecture 10: Noise, saturation, feedforward, and the control-systems roadmap

The final lecture focuses on limitations of ideal feedback models. A controller that works algebraically can still perform poorly when a sensor is noisy, an actuator saturates, a disturbance enters at the wrong place, or a digital implementation behaves differently from a continuous-time model. The lecture also previews the broader fields of modern control.

## 1. Measurement noise enters the feedback loop

With a sensor measuring $y+n$ and a controller $C$, negative feedback uses the measured error $e=r-(y+n)$. If the plant transfer function is $G$, then

$$Y=GC(R-Y-N).$$

Solving for the output gives

$$\boxed{Y=\frac{GC}{1+GC}R-\frac{GC}{1+GC}N=TR-TN.}$$

Measurement noise thus reaches the output through $-T$. Large loop gain at high frequencies produces $T\approx1$, meaning the output may try to follow rapid fluctuations in the measured noise. Reducing $|L|$ at high frequencies generally reduces this effect.

### Follow the noise through the equations

With additive measurement noise $y_m=y+n$, unity feedback gives $e=r-y-n$. The output response to noise is $Y/N=-T=-CG/(1+CG)$. If $|L|\gg1$ in a frequency band, then $T\approx1$ and the output can follow sensor noise there with a negative sign. If $|L|\ll1$, then $T\approx L$ and high-frequency sensor noise has little effect on plant output.

This is why a high closed-loop bandwidth is not automatically desirable: it can extend noise transmission to frequencies where the sensor is least trustworthy. Real sensors also have quantization, bias, and finite sample rates. A design should specify the sensor noise spectrum and check the actual output noise variance or amplitude in the relevant band.

## 2. The controller often amplifies high-frequency noise into its actuator command

It is not enough to inspect the output. The actuator command is $u=C(r-y-n)$. Its response to measurement noise can be much worse than the output response, particularly with derivative action. Formally,

$$\frac{U}{N}=-\frac{C}{1+CG}=-CS.$$

An ideal derivative term $K_d s$ has growing magnitude as frequency increases, so it is especially sensitive to high-frequency noise. A derivative filter, careful sensor selection, or lower crossover frequency may be needed to avoid excessive actuator activity.

### The control channel may be noisier than the output

The noise-to-command transfer is $U/N=-C/(1+CG)=-CS$. At high frequency where $G$ is small, $S\approx1$, so the controller can effectively inject $-Cn$ straight into the actuator. A differentiator makes this especially dangerous because $|C_D(j\omega)|$ rises with $\omega$ until its filter corner.

A useful test is to plot $|CS|$ alongside $|T|$. The plant may hide actuator chatter from the output trace, but the actuator can still wear, heat, saturate, or excite unmodeled mechanics. Noise analysis therefore requires both an output metric and a command metric. Filtering only the plotted output after simulation does not solve a noisy control signal in hardware.

## 3. Input saturation breaks linear superposition

Real actuators cannot supply arbitrarily large torque, thrust, voltage, or force. A saturation nonlinearity takes the form

$$\operatorname{sat}(u)=\begin{cases}u_{\min},&u<u_{\min},\\u,&u_{\min}\le u\le u_{\max},\\u_{\max},&u>u_{\max}.\end{cases}$$

When the actuator clips, the commanded control is no longer the applied input. The exact closed-loop dynamics are no longer described by the original LTI block diagram. A controller whose linear simulation looks excellent may be slower, overshoot, or even become unstable under saturation.

### Saturation invalidates the linear closed-loop transfer function

An actuator with limit $u_{\max}$ applies $u_{actual}=\operatorname{sat}(u_{command})$, not necessarily the command calculated by the controller. When $|u_{command}|>u_{\max}$, proportional scaling and superposition fail. A controller designed for small errors may behave differently during startup, large reference steps, or severe disturbances.

For a motor with a $\pm5$ V limit, a calculated $12$ V command still produces only $5$ V. The resulting acceleration can be much smaller than the linear model predicts, and a high-gain loop cannot force the plant to move faster than the available torque permits. Always simulate saturation explicitly for large-signal tests; a stable small-signal transfer function does not guarantee acceptable large-signal behavior.

## 4. Integrator windup and anti-windup

Integral action continues accumulating error during saturation unless explicitly limited. Suppose the output cannot follow a large step reference because the actuator is at its maximum. The integral term $K_i\int e\,dt$ keeps growing; when the error finally reverses, the stored integral may drive the actuator excessively in the wrong direction. This is **integrator windup**.

Anti-windup implementations include limiting the integrator's state and feeding the difference between commanded and actual saturated control back into the integrator. In a back-calculation design, an integrator state $x_I$ might obey

$$\dot x_I=e+K_{aw}(u_{sat}-u_{cmd}),\qquad u_{cmd}=K_p e+K_i x_I+\cdots.$$

The correction term prevents the integral state from drifting far away from what the real actuator can implement.

### Why windup happens and what anti-windup does

With integral action, the controller state may evolve as $\dot x_I=e$ while the actuator is saturated. If a persistent large error remains, $x_I$ keeps increasing even though the actuator cannot provide more effort. When the output finally approaches the target, the accumulated integral action can drive a large overshoot and a slow recovery.

A common back-calculation anti-windup law is $\dot x_I=e+k_{aw}(u_{actual}-u_{command})$, with the gain and scaling chosen consistently with the controller implementation. The extra term discourages the integrator from accumulating a command the actuator cannot deliver. Conditional integration—temporarily pausing integration when saturation would worsen it—is another option. Neither method eliminates the physical input limit; it makes recovery from saturation more controlled.

## 5. Continuous-time and discrete-time systems

A continuous-time dynamic model is typically a differential equation,

$$\dot x(t)=f(x(t),u(t)),$$

whereas a discrete-time system is a difference equation,

$$\boxed{x[k+1]=f_d(x[k],u[k]).}$$

Continuous-time transfer functions use the Laplace variable $s$; discrete-time transfer functions use the $z$ transform. The sampling time $T_s$ and how the digital output is held between samples affect the closed-loop dynamics.

For a linear continuous-time state-space model with zero-order-held input,

$$x[k+1]=A_d x[k]+B_d u[k],\quad A_d=e^{AT_s},\quad B_d=\int_0^{T_s}e^{A\tau}B\,d\tau.$$

A stable discrete-time mode lies strictly **inside the unit circle** in the $z$-plane, rather than the open left half of the $s$-plane. Sampling too slowly can create aliasing or destabilize a fast loop.

### Sampling changes the mathematics

A continuous-time controller updates in principle at every instant; a digital controller samples measurements at discrete times $t=kT_s$, computes a command, and usually holds it until the next sample. The relevant transform becomes the $z$-transform, and discrete-time stability requires poles strictly **inside the unit circle**, rather than strictly in the left half of the $s$-plane.

Under exact sampling of a continuous-time mode $e^{st}$, its corresponding discrete mode is $z=e^{sT_s}$. For $s=-5$ and $T_s=0.1$ s, $z=e^{-0.5}\approx0.607$, which is stable. For $s=+5$, $z=e^{0.5}>1$, which is unstable. Sampling also adds latency and can alias high-frequency signals, so choosing $T_s$ much smaller than the important closed-loop time scales is a common starting point, followed by exact discrete verification.

## 6. Feedforward for a known reference

Feedback reacts to deviations between reference and measurement. A **feedforward** controller anticipates the known reference's required plant input. With feedforward $F$ added at the plant input,

$$u=Cr-Cy+Fr,\qquad y=G u.$$

This gives

$$\boxed{\frac{Y}{R}=\frac{G(C+F)}{1+GC}.}$$

A model-based feedforward term can improve command tracking without changing the characteristic feedback denominator. But exact inversion of the plant may be impossible or unsafe for nonminimum-phase plants, delays, or model uncertainty. Robust feedback remains important.

### Feedforward anticipates rather than reacts

In a two-degree-of-freedom control system, feedforward uses the known reference to command some of the required plant input before an error develops. If the plant is $G(s)$ and a feedforward block is $F(s)$ inserted at the plant input, perfect nominal tracking would suggest $F\approx G^{-1}$. But this inverse may be noncausal, improper, unstable, or extremely sensitive to modeling errors.

For the simple plant $G(s)=1/(\tau s+1)$, the exact inverse $\tau s+1$ demands ideal differentiation of the reference, which is problematic for a step and noisy commands. A realizable, filtered approximate inverse can improve planned tracking while feedback handles mismatch. Feedforward should complement—not replace—feedback when disturbances and model uncertainty are present.

## 7. Disturbance feedforward: cancel what is measured

If a disturbance $d$ enters before the plant, we can sometimes measure or estimate it and apply a feedforward compensator. If the plant input is $u+d$, then choosing an additional term $u_{ff}=-d$ ideally cancels the disturbance before the plant sees it.

More generally, suppose the disturbance reaches the output through a transfer function $G_d$ and the control input through $G_u$. An ideal feedforward cancellation would use

$$\boxed{F_d(s)=-\frac{G_d(s)}{G_u(s)}.}$$

This algebraic expression is useful only if the needed signals are available and the compensator is causal, stable, physically realizable, and sufficiently accurate. Feedforward depends strongly on model knowledge; feedback can correct residual errors.

### Measured disturbances can be canceled before they act

Suppose $y=G_u u+G_d d$ and the disturbance $d$ is measured. Choose a feedforward control $u_{ff}=F_d d$. The disturbance contribution becomes $(G_uF_d+G_d)d$. Nominal cancellation asks for

$$F_d(s)=-\frac{G_d(s)}{G_u(s)},$$

provided the quotient is meaningful and implementable. If the disturbance path and actuator path have different delays, nonminimum-phase zeros, or bandwidths, exact cancellation may be impossible.

The value of disturbance feedforward is speed: it can start correcting as soon as the disturbance is detected, instead of waiting for an output error. Feedback remains essential to correct imperfect disturbance measurements and model mismatch.

## 8. Disturbance rejection when the disturbance is not measured

If the disturbance cannot be measured, direct feedforward cancellation is not available. The lecture emphasizes that feedback has to be shaped so that the appropriate disturbance-to-output path is small. For a unity-feedback output disturbance, the path is $S$; for a plant-input disturbance it is $GS$.

The desired controller is therefore dependent on what is known. **Known command:** feedforward may help. **Measured disturbance:** disturbance feedforward may help. **Unknown disturbance:** feedback regulation and possibly integral action are needed.

### When the disturbance cannot be measured

An unmeasured disturbance must be dealt with through feedback, plant design, passive isolation, or an observer that estimates its effect. Integral action is especially useful against disturbances that are approximately constant, as long as the relevant disturbance path and closed-loop stability support zero offset.

For an output disturbance $D_o$, $Y/D_o=S$; reducing $|S|$ in the disturbance's frequency band gives attenuation. For a disturbance entering before the plant, $Y/D_i=GS$ and the required loop shaping can be different. No controller can guarantee perfect rejection at every frequency while also maintaining finite actuator effort and high-frequency robustness. Good design starts by identifying which disturbance spectra matter most.

## 9. Why a feedback loop cannot achieve every objective at once

The fundamental identities

$$S=\frac1{1+L},\qquad T=\frac{L}{1+L},\qquad S+T=1$$

remain the central design tools even when practical effects are considered. Increasing low-frequency loop gain often improves tracking and disturbance rejection. Decreasing high-frequency gain often improves noise rejection and robustness to neglected fast modes. Phase margin and sensitivity peaking determine whether the transition is safe.

Actuator saturation, sensor noise, uncertain dynamics, and sampling impose additional limits that are not captured by a single ideal transfer function.

### A compact list of unavoidable tradeoffs

Making the loop faster tends to require higher bandwidth, which can increase high-frequency noise transmission and sensitivity to model error. Increasing integral gain can reduce DC offset but can also reduce damping or cause windup. Adding derivative action can improve damping but can magnify measurement noise. Adding filters may reduce noise while introducing phase lag and delay.

These are not reasons to avoid feedback; they are reasons to specify goals by frequency and signal path. A practical design should be justified with several views of the same system: closed-loop pole locations, step responses, Bode/Nyquist margins, sensitivity functions, noise response, and actuator effort under saturation.

## 10. Where classical control fits in the larger field

**Classical control** uses transfer functions, Bode/Nyquist/Nichols plots, root locus, and PID/lead/lag controllers. **Modern control** uses state-space models, controllability and observability, state feedback, observers, LQR, and LQG. **Robust control** formalizes uncertainty using methods such as $H_\infty$ design and structured robustness analysis. **Optimal and predictive control** explicitly optimize objective functions subject to dynamical and actuator constraints.

All build upon the same basic feedback structure introduced at the start of the course: a controller chooses an input based on a goal, a model, and the information available about the plant. The tools differ, but the engineering tensions between performance, stability, robustness, and implementation do not disappear.

### Where to go after classical control

Classical control describes input-output dynamics effectively, particularly for single-input/single-output LTI systems. State-space methods extend naturally to multivariable systems and enable controllability and observability analysis, state observers, Kalman filtering, and optimal control. Model predictive control can enforce constraints explicitly; robust control formalizes uncertainty; nonlinear control handles larger operating regions and nonlinear phenomena.

The fundamentals transfer directly. Regardless of the framework, you must know which physical signal is controlled, how the plant stores energy, where disturbances and noise enter, how uncertainty affects stability, and which performance limits are physically feasible. The most valuable skill from this course is not one formula, but the ability to derive and check the right model for the question at hand.


## Practice problems and worked solutions

### Problem 1 — Noise transmission

In a unity-feedback system, which transfer function maps additive measurement noise $n$ to output $y$?

**Worked solution.** With $e=r-y-n$ and $L=CG$, $Y/N=-L/(1+L)=-T$. The minus sign depends on the stated summing-junction convention.

### Problem 2 — Sample a stable mode

A continuous pole is at $s=-8$ and the sample period is $0.05$ s. What is the corresponding discrete pole under exact sampling?

**Worked solution.** $z=e^{sT_s}=e^{-0.4}\approx0.6703$. Since $|z|<1$, this sampled mode is stable.

### Problem 3 — Windup diagnosis

Why might a PI-controlled actuator overshoot badly after a long saturated command?

**Worked solution.** The integral state can continue accumulating tracking error while the actuator is unable to deliver the requested command. After the plant catches up, the stored integral state continues driving it. Anti-windup limits or back-calculates the integral state based on actual actuator output.



## Exam mastery — Implementation, cancellation, and model uncertainty

### Why ideal feedforward may be unrealizable

Suppose an external disturbance $d$ reaches the output through $G_d$ and a measured copy is available to a feedforward compensator $C_2$. Under feedback $C_1$, the total disturbance transfer is $(GC_2+G_d)/(1+GC_1)$. Setting $C_2=-G_d/G$ would cancel the modeled disturbance exactly. Yet if $G$ has a RHP zero, its inverse has a RHP pole; if $G$ is strictly proper and $G_d$ is not sufficiently proper, $G_d/G$ requires noncausal differentiation; if measurement is delayed, cancellation occurs too late. This is why the midterm's ideal solution must be followed by a **feasibility** discussion.

### Why the actuator changes the mathematics

A proportional-integral controller accumulates error: $\dot z=e$, $u=K_pe+K_Iz$. If a motor saturates at $u_{\max}$, the physical command becomes $u_{\rm act}=\operatorname{sat}(u)$ while $z$ may keep integrating. After the reference comes back down, the accumulated integral state can push the actuator in the wrong direction and cause a long recovery. Back-calculation anti-windup adds a term proportional to $u_{\rm act}-u$ to $\dot z$; conditional integration freezes the integral state while saturated in the error-driving direction. These methods improve **implementation behavior**, not the nominal linear transfer function.

### How to verify a controller for an exam-level design

Check all of the following after choosing gains: (1) closed-loop pole locations and stability; (2) actual rise, peak, and settling of the complete closed-loop transfer function including zeros; (3) $e_\infty$ with the final-value theorem under valid assumptions; (4) every gain/phase crossover, including multiple ones; (5) $S$ and $T$ where disturbances and noise occur; (6) command amplitude and possible saturation; (7) delay and parametric uncertainty. A candidate that satisfies one margin or DC requirement can still fail the system-level objective.



---

<!-- Exam-ready derivation lab — HTML supplement; editable, preserved exactly as on the web page. -->

<section class="mastery-lab" id="deep-derivation"><p class="lab-kicker">Combine two different control actions</p><h2>Derivation lab: feedforward cancellation with feedback correction</h2>
<p>Suppose a gust <span class="math">\(d\)</span> reaches the output through <span class="math">\(G_d\)</span>, while the actuator path is <span class="math">\(G\)</span>. A feedback controller <span class="math">\(C_1\)</span> uses error <span class="math">\(r-y\)</span>; a feedforward controller <span class="math">\(C_2\)</span> drives the same actuator from a measurement of the gust:</p>
<div class="math-block">\[y=G\big(C_1(r-y)+C_2d\big)+G_dd.\]</div>
<p>Set <span class="math">\(r=0\)</span>, collect output terms, and divide:</p>
<div class="math-block">\[\boxed{\frac{Y}{D}=\frac{GC_2+G_d}{1+GC_1}}.\]</div>
<p>Ideal cancellation occurs if <span class="math">\(\boxed{C_2=-G_d/G}\)</span>. But this formula may demand an unstable inverse, an improper differentiating filter, noncausal action, or perfect measurements. Even with nominal cancellation, plant uncertainty leaves a residual <span class="math">\(GC_2+G_d\)</span>. Well-designed stabilizing feedback makes the residual smaller where <span class="math">\(|1+GC_1|\)</span> is large.</p>
<details class="quick-check"><summary>What if \(C_2=0\)?</summary><p>Then <span class="math">\(Y/D=G_d/(1+GC_1)=G_d S\)</span>. Feedback alone attenuates the disturbance according to sensitivity.</p></details><p class="exam-link">Re-derive the block diagram in <a href="midterm.html">Midterm Problem 5</a>.</p></section>
