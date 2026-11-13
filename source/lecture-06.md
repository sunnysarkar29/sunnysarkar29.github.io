# Lecture 6: Feedback goals, sensitivity, steady-state error, and PID

Feedback is introduced for several related but different objectives: stabilization, reference tracking, regulation, and rejection of disturbances despite model uncertainty. This lecture develops the sensitivity and complementary-sensitivity transfer functions, uses the final-value theorem to calculate tracking error, and introduces proportional, integral, and derivative control.

## 1. Standard unity-feedback equations

Consider a negative-feedback loop with controller $C(s)$ and plant $G(s)$. Write the loop transfer function as $L(s)=C(s)G(s)$. With input-side disturbance $d_i$ and output disturbance $d_o$,

$$Y=G\big[C(R-Y)+D_i\big]+D_o.$$

Rearranging gives

$$Y=\underbrace{\frac{L}{1+L}}_{T}R+\underbrace{\frac{G}{1+L}}_{GS}D_i+\underbrace{\frac1{1+L}}_{S}D_o.$$

The three fractions are not interchangeable: the disturbance's injection point determines how it reaches the output. The two most prominent closed-loop functions are **sensitivity** $S$ and **complementary sensitivity** $T$.

### Derive all paths from the same three equations

For unity negative feedback, write $e=r-y-n$, $u=Ce$, and $y=G(u+d_i)+d_o$. Solving simultaneously is safer than memorizing separate disturbance diagrams. With $L=CG$, the outputs satisfy $Y=TR+GS D_i+S D_o-TN$.

For the actuator command, $U=CS R-CS D_o-CGS D_i-CS N$ under this particular plant-input disturbance convention. These equations highlight a distinction that is easy to miss: a disturbance can be small at the *output* while demanding a large correcting command from the controller. Performance requirements should include actuator limits, not just plots of $y(t)$.

## 2. Four main goals of feedback

**Stabilization:** Choose a controller so the full closed-loop system is internally stable, even if the open-loop plant is unstable. **Tracking:** Make the output follow a varying reference. **Regulation:** Hold the output near a desired level, often a fixed reference such as zero. **Disturbance rejection and robustness:** Reduce the effect of environmental disturbances, parameter changes, and modeling errors.

These goals interact. An extremely aggressive controller might track rapidly but saturate an actuator, increase noise sensitivity, or decrease stability margins. Design means satisfying several requirements simultaneously.

### Translate vague goals into measurable constraints

“Track accurately” might mean less than $1\%$ steady-state error for a step. “Reject disturbances” might mean $|S(j\omega)|<0.1$ below $1$ rad/s. “Be robust” might mean maintaining acceptable performance despite a specified uncertainty in plant gain, phase, or neglected dynamics. “Avoid noise amplification” might mean attenuating measurement noise above a chosen frequency.

These objectives compete. At a given frequency, $S+T=1$, so both transfer magnitudes cannot simultaneously be arbitrarily small. A sensible design first identifies the frequencies where each requirement matters, then allocates loop gain and phase accordingly. The controller is a compromise engineered against explicit goals, not a magical device that makes all errors vanish.

## 3. Sensitivity to uncertainty

For the open-loop plant $G$, perturb the model by $\delta G$ while keeping the controller fixed. The closed-loop transfer function is $T=CG/(1+CG)$. Its differential is

$$\delta T\approx\frac{C}{(1+CG)^2}\,\delta G.$$

Define the *relative sensitivity* of $T$ to $G$ as the ratio of fractional changes:

$$S_G^T=\frac{\delta T/T}{\delta G/G}.$$

Algebra yields

$$\boxed{S_G^T=\frac1{1+CG}=S(s).}$$

A small magnitude $|S|$ means that modest fractional changes in plant gain cause smaller fractional changes in closed-loop behavior. In the high-loop-gain range, $|L|\gg1$, we normally obtain $|S|\approx1/|L|\ll1$, provided $1+L$ is not close to zero.

### Sensitivity has a differential interpretation

For a unity-feedback loop with $T=L/(1+L)$, a small relative perturbation $\delta L/L$ changes the closed-loop transfer approximately by

$$\frac{\delta T}{T}\approx S\frac{\delta L}{L},\qquad S=\frac1{1+L}.$$

Thus if $|S|=0.05$ at some frequency, a small $10\%$ relative loop perturbation produces roughly a $0.5\%$ relative change in $T$ there, assuming linear perturbation theory applies. This is the origin of the name *sensitivity*. Large loop gain often makes $S$ small at low frequency, but near an unstable crossover $1+L$ can become small and sensitivity can peak sharply.

## 4. Complementary sensitivity

By definition,

$$\boxed{S(s)=\frac1{1+L(s)},\qquad T(s)=\frac{L(s)}{1+L(s)}.}$$

They satisfy the exact identity

$$\boxed{S(s)+T(s)=1.}$$

This identity encodes the basic compromise. At frequencies where $S$ is small, $T$ is near one. At frequencies where $T$ is small, $S$ is near one. It is impossible for both to be simultaneously tiny at the same frequency, since they sum to one as complex numbers.

With measurement noise $n$ entering the feedback signal $y+n$, the measured-error equation becomes $e=r-y-n$, and the output due to noise is

$$\frac{Y}{N}=-T(s).$$

Consequently, high-frequency measurement-noise attenuation usually calls for small $|T|$ at high frequencies, another reason the loop gain should decay there.

### Complementary sensitivity is more than a second formula

From the definitions, $S+T=1$. When $|L|\gg1$, $T\approx1$ and $S\approx1/L$; the output tracks the reference well and certain disturbances are suppressed, but measurement noise enters the output approximately as $-n$. When $|L|\ll1$, $T\approx L$ and $S\approx1$; noise transmission is reduced, but feedback has little authority against output disturbances.

This makes the crossover region the heart of design. We often aim to keep $T$ near one at low frequency, make it roll off at high frequency, and avoid excessive peaking between them. A large peak $M_T=\sup_\omega |T(j\omega)|$ can indicate a resonant response and limited robustness, though exact implications depend on the system.

## 5. Why high gain improves some things and damages others

At low frequencies, large loop gain makes $S\approx0$ and $T\approx1$; this provides tracking and output-disturbance rejection. At high frequencies, small loop gain makes $T\approx L\approx0$; this suppresses measurement noise transmitted to the output. The desired transition between these regions establishes a crossover and a practical bandwidth.

However, making $L(j\omega)$ extremely large near a phase of $-180^\circ$ does not guarantee good behavior. If $L\approx-1$, the denominator $1+L$ is small, so both $S$ and $T$ can become large. Stability margins quantify the distance from this dangerous condition.

### Why “just turn up the gain” fails

Take $G(s)=1/(s+1)^3$ with controller $C=K$. As $K$ grows, the low-frequency loop magnitude grows and the steady error shrinks for stable gains. But the phase of the plant approaches $-270^\circ$ at high frequency, so moving the gain crossover to the right also moves it into a region of greater lag. Eventually the closed loop can become unstable.

Gain also magnifies the demanded control signal and exposes actuator saturation. A stabilizing controller may therefore need additional dynamics—a lead network, filtering, or careful PID shaping—rather than merely a larger scalar $K$. Always evaluate phase margin and closed-loop poles after increasing gain.

## 6. The final-value theorem

For a signal $y(t)$ with a finite limit and with the required stability conditions, the final-value theorem states

$$\boxed{\lim_{t\to\infty}y(t)=\lim_{s\to0}sY(s).}$$

The standard pole condition is that all poles of $sY(s)$ lie in the open left half-plane, except any removable issues at the origin. If the response diverges or keeps oscillating indefinitely, the theorem cannot be used to claim a finite final value.

The final value of the response to a unit step $R(s)=1/s$ is frequently the closed-loop DC gain:

$$y_{ss}=\lim_{s\to0}T(s).$$

The theorem is particularly efficient for calculating steady-state tracking errors without computing the full inverse Laplace transform.

### The hidden hypothesis in the final-value theorem

For a signal $e(t)$ with Laplace transform $E(s)$, the final-value theorem gives $e(\infty)=\lim_{s\to0}sE(s)$ **only when the poles of $sE(s)$ lie strictly in the left half-plane**, apart from acceptable cancellations handled carefully. It cannot certify a final value for an unstable or persistently oscillating response.

For example, $e(t)=e^t$ has $E(s)=1/(s-1)$, and the formal limit $\lim_{s\to0}s/(s-1)=0$ misleadingly suggests zero error. The actual signal grows without bound. The correct sequence is: verify the relevant closed-loop stability conditions, find $E(s)$, and only then apply the theorem.

## 7. Steady-state tracking error for standard inputs

For unity feedback, $E(s)=S(s)R(s)=R(s)/(1+L(s))$. The error limit, when it exists, is

$$e_{ss}=\lim_{s\to0}sE(s)=\lim_{s\to0}\frac{sR(s)}{1+L(s)}.$$

Three reference classes are especially important:

| Input | Time function | Laplace transform |
| --- | --- | --- |
| Step | $r(t)=1$ | $1/s$ |
| Ramp | $r(t)=t$ | $1/s^2$ |
| Parabolic | $r(t)=t^2/2$ | $1/s^3$ |

For a step, $e_{ss}=1/(1+K_p)$ with $K_p=\lim_{s\to0}L(s)$, when the limit and closed-loop stability conditions hold. For a ramp, $e_{ss}=1/K_v$ with $K_v=\lim_{s\to0}sL(s)$. For a parabolic input, $e_{ss}=1/K_a$ with $K_a=\lim_{s\to0}s^2L(s)$.

### Work the steady-state error systematically

In unity feedback, $E(s)=R(s)/(1+L(s))$. For a unit step $R(s)=1/s$, stable final error is $e_{ss}=\lim_{s\to0}1/[1+L(s)]$. For a unit ramp $R=1/s^2$, the error is $e_{ss}=\lim_{s\to0}1/[s(1+L(s))]$, when the limit exists.

Define $K_p=\lim_{s\to0}L(s)$ and $K_v=\lim_{s\to0}sL(s)$. For the usual stable unity-feedback setup, step error is $1/(1+K_p)$ and ramp error is $1/K_v$. Be attentive to the amplitude of the reference: a ramp $r(t)=at$ has error $a/K_v$, not necessarily $1/K_v$. A perfect reference transfer at DC does not imply good transient behavior.

## 8. System type and the number of integrators

A **Type $k$** loop has $k$ uncanceled poles at the origin in its loop transfer function. Equivalently, write

$$L(s)=\frac{\widetilde L(s)}{s^k},\qquad\widetilde L(0)\ne0,\ \widetilde L(0)\ne\infty.$$

For a stable unity-feedback loop, the standard steady-state tracking-error patterns are:

| Loop type | Step | Ramp | Parabolic |
| --- | --- | --- | --- |
| Type 0 | finite nonzero | infinite | infinite |
| Type 1 | zero | finite nonzero | infinite |
| Type 2 | zero | zero | finite nonzero |
| Type 3 or higher | zero | zero for lower polynomial orders | depends on input order |

An integrator accumulates the error until the control input has changed enough to eliminate a persistent offset. However, adding integral action also changes the loop's pole structure and phase and can damage stability margins if not tuned.

### Count integrators before calculating limits

The **type** of a unity-feedback open loop is the number of net poles at $s=0$ in $L(s)$ after appropriate reduction and without unsafe cancellations. A type-0 loop usually has finite nonzero step error and unbounded ramp error. Type 1 has zero step error and finite ramp error. Type 2 has zero step and ramp error and finite parabolic-input error, assuming closed-loop stability and ordinary polynomial-reference conditions.

For $L(s)=10/[s(s+5)]$, there is one integrator, so it is type 1. Its velocity constant is $K_v=\lim_{s\to0}10/(s+5)=2$, giving unit-ramp error $e_{ss}=1/2$. Do not infer a system's type from the number of poles anywhere in the left half-plane; only poles at the origin count.

## 9. Example: proportional control and finite step error

Let $G(s)=A/(s+a)$ and $C(s)=K$. Then

$$L(s)=\frac{KA}{s+a},\quad S(s)=\frac{s+a}{s+a+KA}.$$

For a unit step,

$$e_{ss}=S(0)=\boxed{\frac{a}{a+KA}}.$$

Increasing the proportional gain $K$ reduces the error but generally does not make it exactly zero at finite gain. The loop is Type 0 unless the plant already has an integrator.

### Proportional control cannot generally erase a DC error

Let $G(s)=1/(s+2)$ and $C=K_p$. The DC loop gain is $K_p/2$. The step error is therefore $e_{ss}=1/[1+K_p/2]=2/(2+K_p)$. With $K_p=8$, a unit step leaves an error of $0.2$ despite a stable, reasonably quick response.

Increasing $K_p$ reduces this error but cannot make it exactly zero for finite $K_p$ in this model. This does not imply proportional control is poor: for some applications a small offset is acceptable and simpler control has advantages. Integral action is appropriate when zero DC offset is an actual requirement and the resulting dynamics can be stabilized.

## 10. Example: integral action eliminates step error

Now take a PI controller $C(s)=K_p+K_i/s$, with $K_i>0$. For a plant with finite nonzero DC gain, the loop gains a pole at $s=0$ and becomes Type 1. Formally, if the closed loop is stable,

$$\lim_{s\to0}L(s)=\infty\quad\Longrightarrow\quad e_{ss,\mathrm{step}}=\lim_{s\to0}\frac{1}{1+L(s)}=0.$$

This is the mathematical reason integral control is widely used to remove offset from tracking and regulation. The phrase **if the closed loop is stable** is essential: a divergent response has no meaningful steady-state error.

### What an integrator changes in the loop

A PI controller $C(s)=K_p+K_i/s$ has very high magnitude as $s\to0$ when $K_i\ne0$, often driving steady-state step error to zero. The integrator accumulates persistent error: if the output stays below the target, the integral term keeps increasing the actuator demand until the offset is corrected.

However, an integrator also contributes phase lag and can create oscillation or windup. For a first-order plant $G=1/(s+1)$ and $C=K_i/s$, the characteristic equation is $s^2+s+K_i=0$. As $K_i$ grows, the system transitions from real poles to an underdamped pair. Zero final step error does not guarantee a smooth or stable transient.

## 11. Proportional, integral, and derivative control

A PID controller is defined in time by

$$u(t)=K_p e(t)+K_i\int_0^t e(\tau)\,d\tau+K_d\dot e(t),$$

corresponding, under zero initial conditions, to the ideal transfer function

$$\boxed{C(s)=K_p+\frac{K_i}{s}+K_d s.}$$

The proportional term reacts to the present error, the integral term reacts to accumulated past error, and the derivative term reacts to the rate of change of error. Each has a purpose, but the three gains are coupled through the closed-loop poles and zeros.

Ideal derivative action has gain growing without bound as frequency increases, so real implementations typically use a **filtered derivative** such as

$$C_D(s)=K_d\frac{s}{1+\tau_f s}.$$

Using derivative action on a noisy measured signal can produce large actuator commands. Derivative-on-measurement and other practical structures avoid some of the problems caused by differentiating a step reference.

### Assign each PID term a job

The proportional term reacts to the present error, the integral term accumulates past error, and the derivative term reacts to the trend. In a moving-platform analogy, P steers based on current displacement, I corrects a persistent offset due to wind or bias, and D anticipates motion that might cause overshoot.

Ideal derivative control on noisy measured error is dangerous because differentiating a high-frequency sinusoid multiplies its amplitude by frequency. Practical implementations use a filtered term such as $K_ds/(1+s/\omega_f)$. Derivative is often taken on the measurement rather than on the reference error to avoid a large “derivative kick” when the setpoint suddenly changes.

## 12. PI and PID forms reveal their zeros

A PI controller can be written

$$C_{PI}(s)=K_p+\frac{K_i}s=K_p\frac{s+K_i/K_p}{s}.$$

It has one pole at the origin and one left-half-plane zero for positive gains. A PID controller becomes

$$C_{PID}(s)=\frac{K_d s^2+K_p s+K_i}{s}.$$

When the quadratic factors into real or complex-conjugate zeros, its frequency response can be interpreted in terms of those zero locations. Proper filtered implementations must still be used in a physical controller.

### Learn to read a PI/PID controller as poles and zeros

For $C_{PI}(s)=K_p+K_i/s=(K_ps+K_i)/s$, there is an integrator at the origin and a zero at $s=-K_i/K_p$ when both gains are positive. The integrator builds low-frequency gain; the zero partly restores phase around its location. The controller is not simply “P plus a correction”; it has a definite frequency-response shape.

An ideal PID has $C(s)=(K_ds^2+K_ps+K_i)/s$. Its numerator zeros can be placed to shape the loop, but these zeros alone do not ensure stability. In practice the derivative pole from filtering, actuator limits, and sampling must also be included. Reason about the full loop $CG$, not the controller numerator in isolation.

## 13. Controllers must be designed as a system

The lecture closes by listing methods for selecting $K_p,K_i,K_d$: empirical tuning, root locus, matching a desired second-order characteristic equation, and frequency-domain design. These methods are different views of the same closed-loop pole-and-frequency-response constraints. No single gain-setting rule guarantees stable high-performance behavior across every plant.

### A safe iterative tuning workflow

Begin with a validated plant model and decide what the controller must do at low, medium, and high frequency. Choose P, PI, lead, or filtered PID depending on the needed DC accuracy and phase improvement. Check whether all closed-loop poles are stable; then assess step response, disturbance paths, measurement-noise transmission, and actuator commands. Finally perturb plant parameters and add plausible delay to see whether the result has margin.

A common failure mode is to tune only against a perfect reference-step plot. Such a controller may look excellent in simulation but saturate the actuator, amplify sensor noise, or perform poorly against disturbances entering elsewhere. Robust design requires testing **multiple input channels** and acknowledging modeling uncertainty.


## Practice problems and worked solutions

### Problem 1 — Step error

For $L(s)=8/(s+2)$ in unity feedback, find the final error to a unit step, assuming closed-loop stability.

**Worked solution.** $K_p=L(0)=4$, so $e_{ss}=1/(1+K_p)=1/5=0.2$.

### Problem 2 — Ramp error

For $L(s)=12/[s(s+3)]$, find the final error to a unit ramp.

**Worked solution.** $K_v=\lim_{s\to0}sL(s)=12/3=4$, so $e_{ss}=1/K_v=0.25$. The loop is type 1; its step error is zero, assuming stability.

### Problem 3 — PI zero

Where is the zero of $C(s)=4+8/s$?

**Worked solution.** $C(s)=(4s+8)/s=4(s+2)/s$, so the controller has an integrator at $0$ and a zero at $-2$.



## Exam mastery — All four closed-loop transfer paths from one equation

### The most reusable derivation in this course

Let an input disturbance $d_i$ be added before a plant $G$, output disturbance $d_o$ after it, and measurement noise $n$ at the feedback sensor. Then $e=r-y-n$ and

$$y=G(Ce+d_i)+d_o=GC(r-y-n)+Gd_i+d_o.$$

Collect terms and define $L=GC$, $S=(1+L)^{-1}$ and $T=L/(1+L)$:

$$\boxed{y=Tr-Tn+GS\,d_i+S\,d_o.}$$

Each disturbance position matters. With high $|L|$, output disturbances are attenuated ($|S|\ll1$), while measurement noise goes to $-y\approx n$ because $|T|\approx1$. At high frequency, small $|L|$ helps reject noise but output disturbances are less attenuated. This explains why one controller cannot arbitrarily shrink $S$ and $T$ at every frequency: $S+T=1$.

### Why an integrator removes constant steady-state error

For unity feedback, $E/R=S=1/(1+L)$. A unit step has $R(s)=1/s$; if the closed loop is stable, the final-value theorem gives $e_\infty=\lim_{s\to0}sE(s)=S(0)$. If $L(s)$ contains one uncancelled integrator and is stable in closed loop, $|L(0)|\to\infty$, so $S(0)=0$. But this conclusion depends on **internal stability** and an unsaturated actuator. Do not apply the final-value theorem when its poles conditions fail.

### A complete PI design calculation

For $G(s)=1/(s+1)$ and $C(s)=k_p+k_I/s$, the characteristic polynomial is $s^2+(1+k_p)s+k_I$. Pick desired $\omega_n=4$ rad/s, $\zeta=0.7$: $k_I=\omega_n^2=16$ and $k_p=2\zeta\omega_n-1=4.6$. This gives stable nominal poles at $-2.8\pm j2.857$. The reference numerator $4.6s+16$ still creates a closed-loop zero, so check the **actual** step response before claiming 4.6% overshoot from $\zeta=0.7$ alone.



---

<!-- Exam-ready derivation lab — HTML supplement; editable, preserved exactly as on the web page. -->

<section class="mastery-lab" id="deep-derivation"><p class="lab-kicker">One algebraic equation, four answers</p><h2>Derivation lab: reference, disturbances, and noise in one feedback loop</h2>
<p>Suppose <span class="math">\(C\)</span> drives a plant <span class="math">\(G\)</span> with unity negative feedback. Let <span class="math">\(d_i\)</span> be added at the plant input, <span class="math">\(d_o\)</span> at the output, and measurement noise <span class="math">\(n\)</span> at the sensor. Then the controller sees <span class="math">\(e=r-y-n\)</span> and</p>
<div class="math-block">\[y=G\big(C(r-y-n)+d_i\big)+d_o.\]</div>
<p>Collect every term containing <span class="math">\(y\)</span> on the left, define <span class="math">\(L=GC\)</span>, and divide:</p>
<div class="math-block">\[\boxed{y=\underbrace{\frac{L}{1+L}}_{T}r+\underbrace{\frac{G}{1+L}}_{GS}d_i+\underbrace{\frac1{1+L}}_{S}d_o-\underbrace{\frac{L}{1+L}}_{T}n.}\]</div>
<p>This explains why stronger low-frequency gain improves output-disturbance rejection but usually makes the output follow low-frequency measurement noise with opposite sign. Always specify where a disturbance enters: input and output disturbances have <em>different numerators</em>. The identity <span class="math">\(S+T=1\)</span> provides a useful algebraic check.</p>
<details class="quick-check"><summary>With the loop opened (\(C=0\)), what should the four paths become?</summary><p>They reduce to <span class="math">\(Y/R=0\)</span>, <span class="math">\(Y/D_i=G\)</span>, <span class="math">\(Y/D_o=1\)</span>, and <span class="math">\(Y/N=0\)</span>; the output still responds to physical disturbances, but the idle controller no longer passes reference or sensor noise.</p></details><p class="exam-link">Use this to independently derive <a href="homework-02.html">Homework 2, Problem 5</a> and <a href="homework-04.html">Homework 4, Problem 5</a>.</p></section>
