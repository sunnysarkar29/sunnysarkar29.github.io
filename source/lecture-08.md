# Lecture 8: Sensitivity bounds and frequency-domain controller design

This lecture develops the geometry of the sensitivity and complementary-sensitivity functions, connects phase margin to closed-loop peaking, and turns frequency-domain requirements into a loop-shaping problem. It introduces notch, lead, lag, PI, and PID compensators as practical building blocks.

## 1. Revisit the sensitivity circle on the Nyquist plot

For unity negative feedback,

$$S(s)=\frac1{1+L(s)},\qquad T(s)=\frac{L(s)}{1+L(s)}.$$

The complex distance from the Nyquist point $L(j\omega)$ to the critical point $-1$ is $|1+L(j\omega)|$. Therefore,

$$\boxed{|S(j\omega)|=\frac1{|1+L(j\omega)|}}$$

is greater than one wherever the Nyquist curve lies inside the unit circle centered on $-1$. This unit circle is a useful geometric diagnostic: sensitivity amplification is determined by proximity to $-1$, not just by the size of $|L|$ alone.

Similarly,

$$\boxed{|T(j\omega)|=\frac{|L(j\omega)|}{|1+L(j\omega)|}.}$$

A large loop magnitude may make $T$ close to one when far from the critical point, but a nearly canceled denominator can make $T$ exceed one, causing resonant closed-loop peaking.

### The distance picture makes sensitivity tangible

At a chosen frequency, draw the complex loop value $L(j\omega)$ on the Nyquist plane. The vector from $-1$ to $L$ is $1+L$, whose magnitude is the denominator of both sensitivity and complementary sensitivity. Hence $|S|=1/|1+L|$ and $|T|=|L|/|1+L|$.

If the curve passes $0.1$ units from $-1$, then $|S|=10$ at that frequency—a disturbance or model perturbation can be amplified significantly. If the curve remains at least $0.5$ away, then $|S|\le2$. This geometric interpretation often explains a design failure more immediately than a complicated algebraic denominator.

## 2. Constant-sensitivity and constant-complementary-sensitivity contours

The equation $|S|=c$ is equivalent to

$$|1+L|=\frac1c,$$

which is a circle of radius $1/c$ centered at $-1$ in the Nyquist plane. Constant $|T|$ contours also form circles or lines, since

$$|T|=c\quad\Longleftrightarrow\quad |L|=c|1+L|.$$

These geometric contours explain how a Nichols chart can be furnished with constant closed-loop magnitude grids. They make it possible to interpret open-loop curves in terms of closed-loop sensitivity without separately calculating $S$ and $T$ at every point.

### Constant-performance circles are locus equations

A constant sensitivity level $|S|=M$ means $|1+L|=1/M$: it is a circle centered at $-1$ of radius $1/M$ on the Nyquist plane. For complementary sensitivity, $|T|=M$ implies $|L|=M|1+L|$. Writing $L=x+jy$ and squaring yields

$$x^2+y^2=M^2\big[(x+1)^2+y^2\big].$$

For $M\ne1$, completing the square shows the $T$ contours are circles with centers on the real axis. These circles can be mapped to a Nichols chart. Their use is practical: you can draw the open-loop curve and see whether its trajectory violates a closed-loop resonance bound, without first computing the entire closed-loop transfer at every candidate design.

## 3. Phase margin and peak complementary sensitivity

At a gain crossover, $|L|=1$. Using the conventional phase-margin definition, the phase of the loop point is $-180^\circ+\mathrm{PM}$. By the law of cosines,

$$\begin{aligned}|1+L|^2&=1+|L|^2+2|L|\cos(-180^\circ+\mathrm{PM})\\&=2(1-\cos\mathrm{PM}).\end{aligned}$$

Consequently,

$$\boxed{|T(j\omega_{gc})|=\frac{1}{\sqrt{2(1-\cos\mathrm{PM})}}.}$$

This is the complementary sensitivity **at crossover**, not necessarily the global maximum of $|T|$. For small positive phase margin, the denominator is small and the output can experience severe closed-loop peaking. For instance, at a phase margin of $30^\circ$, the crossover value is about $1.93$; at $60^\circ$, it is exactly $1$.

### Phase margin constrains but does not determine resonance

At a gain crossover, $|L|=1$. If the loop phase is $-180^\circ+PM$, then

$$|1+L|=2\sin(PM/2),\qquad |T|=|S|=\frac1{2\sin(PM/2)}$$

**at that crossover frequency**. For $PM=60^\circ$, this value equals one; for $PM=30^\circ$, it is about $1.93$. But the *maximum* of $|T|$ over all frequencies may occur somewhere else. Consequently, this relationship is a useful local bound and intuition—not a formula that uniquely fixes global complementary-sensitivity peaking or transient overshoot.

## 4. Phase, gain slope, and minimum-phase relationships

For a suitable stable minimum-phase transfer function, magnitude and phase are not independent: they are linked through integral relations. Near crossover, a slowly varying, approximately $-20$ dB/decade loop slope often corresponds to a less troublesome phase than a steep fall dominated by many poles.

A simple asymptotic heuristic can be obtained from the factor contributions: each additional first-order pole ultimately reduces slope by $20$ dB/decade and adds up to $90^\circ$ lag; each left-half-plane zero adds slope and phase lead. Nonminimum-phase zeros and delays break naive magnitude-to-phase intuition, even when the magnitude is unchanged.

### Phase and magnitude are linked only under assumptions

For stable, minimum-phase systems with suitable analyticity and decay, gain and phase are connected by Hilbert-transform/Bode relationships. This is why a change in magnitude slope often comes with a predictable phase contribution. Lead and lag compensators exploit precisely that coupling.

The exceptions are instructive. A pure delay has unit magnitude but negative phase. A right-half-plane zero and a corresponding left-half-plane zero can have identical magnitude but different phase. These are **nonminimum-phase** effects that create additional lag invisible to a magnitude-only design. Never use a gain-slope heuristic as an exact phase calculation when delay or right-half-plane factors are present.

## 5. Bode's sensitivity integral and the waterbed effect

Under the standard continuous-time assumptions for a stable closed-loop rational system with stable open-loop poles and sufficient high-frequency decay, the sensitivity obeys the Bode integral relation

$$\boxed{\int_0^\infty\ln|S(j\omega)|\,d\omega=0.}$$

The exact generalized integral changes when open-loop right-half-plane poles are present or the regularity assumptions do not hold. The main design message is that suppressing sensitivity over one broad frequency range often forces amplification somewhere else. If $|S|\ll1$ for low frequencies, some higher-frequency region may exhibit $|S|>1$.

This phenomenon is called the **waterbed effect**. It makes the notion of “perfect disturbance rejection at every frequency” unrealistic for ordinary feedback systems.

### Why pushing sensitivity down makes it rise elsewhere

Under standard stability, minimum-phase, relative-degree, and other technical assumptions, Bode sensitivity-integral results constrain the signed area of $\log|S(j\omega)|$ over frequency. Roughly speaking, if feedback forces $|S|<1$ over a broad low-frequency band, another band often has $|S|>1$. This is the “waterbed effect”: pressing sensitivity down in one region makes it rise elsewhere.

The exact integral depends on open-loop unstable poles and on assumptions about relative degree and high-frequency behavior; do not apply the zero-area version indiscriminately. The engineering lesson is durable: low-frequency disturbance rejection, high bandwidth, and small sensitivity peaks cannot all be optimized independently. The location of the inevitable peak is a major design decision.

## 6. Design requirements as bounds on $S$ and $T$

A frequency-domain design begins with requirements on measurable behavior, then translates them into constraints on transfer functions. For example, if a slowly varying output disturbance must be attenuated by a factor of ten, require $|S(j\omega)|<0.1$, or $-20$ dB, over the disturbance's frequency band. For reference tracking, require $|T(j\omega)|\approx1$ with small phase lag over the required operating band.

For high-frequency sensor noise, require $|T(j\omega)|$ to be small. For an input-side disturbance, the relevant output path is $GS$, not merely $S$. A design specification must name **both the transfer path and the frequency range**.

### Translate requirements into frequency-dependent inequalities

A specification like “attenuate output disturbances by at least 20 dB below $1$ rad/s” means $|S(j\omega)|\le0.1$ in that band. A requirement like “transmit measurement noise by less than $-30$ dB above $100$ rad/s” means $|T(j\omega)|\le10^{-30/20}\approx0.0316$ there.

If $|L|\gg1$, the first becomes approximately $|L|\gtrsim10$; if $|L|\ll1$, the second becomes approximately $|L|\lesssim0.0316$. These are **approximate loop-gain guides**, while exact checks should use $S=1/(1+L)$ and $T=L/(1+L)$ with phase included. Working with inequalities prevents you from mistaking a desired Bode sketch for a proven design.

## 7. Convert output-disturbance requirements into loop-gain bounds

Suppose $|S|<\epsilon<1$ is required at frequency $\omega$. Since $S=1/(1+L)$, this condition is exactly

$$|1+L|>\frac1\epsilon.$$

The triangle inequality gives $|1+L|\le1+|L|$, so a necessary condition is

$$\boxed{|L|>\frac1\epsilon-1.}$$

A sufficient but more conservative condition follows from $|1+L|\ge |L|-1$: if $|L|>1+1/\epsilon$, then the desired bound follows regardless of loop phase. Precise design should use the full complex $L(j\omega)$ rather than magnitude-only necessary conditions.

### One disturbance path is not every disturbance path

For an additive output disturbance $d_o$, $Y/D_o=S$. Thus the exact bound $|Y/D_o|\le\epsilon$ is $|S|\le\epsilon$. For a plant-input disturbance $d_i$, however, $Y/D_i=GS$, so the exact bound is $|GS|\le\epsilon$.

Suppose the plant itself attenuates high frequencies strongly. Then $GS$ can be small at high frequency even though $S\approx1$. Conversely, a plant with a resonance can amplify an input disturbance before feedback suppresses it. Always draw the disturbance at its stated injection point and derive the transfer before turning a performance requirement into a loop-shaping constraint.

## 8. Convert noise and disturbance rejection into controller objectives

Consider the output relations for reference $r$, input disturbance $d_i$, output disturbance $d_o$, and measurement noise $n$:

$$Y=TR+GS\,D_i+S\,D_o-TN.$$

This one formula tells us what to optimize. Disturbance rejection at low frequencies usually requires large $|L|$; sensor-noise attenuation at high frequencies usually requires small $|L|$; good phase and gain margins constrain the transition between them. The familiar low-frequency/high-frequency tradeoff is a consequence of feedback algebra.

### Control effort and measurement noise impose additional bounds

The sensor noise-to-output transfer in unity feedback is $-T$ under the usual additive measurement model, while the sensor noise-to-control transfer is $-CS$. High-frequency controller gain can therefore make the actuator react violently to noise even if the plant filters much of that command before it reaches the output.

For a disturbance injected at the plant input, $Y/D_i=GS$, but control effort due to that disturbance is $U/D_i=-CGS$ with the stated conventions. Designing only against $|Y|$ may hide an excessively large $|U|$. A realistic controller must meet both output-performance bounds and actuator limits, including transients from sensor noise, disturbances, and reference changes.

## 9. A loop-shaping procedure

The lecture uses an iterative design methodology. First choose performance requirements: tracking bandwidth, rise time, overshoot, disturbance rejection bands, and noise attenuation. Translate each requirement into a desired shape for $S$, $T$, or related closed-loop paths. Next design or modify $C(s)$ to shape $L(s)=C(s)G(s)$. Then examine open-loop crossover, margins, closed-loop poles, and time responses. Repeat until all important requirements are satisfied.

A controller is therefore not designed by maximizing one number in isolation. In particular, increasing low-frequency gain can shift crossover into a region with excessive plant phase lag, while a large high-frequency controller gain can magnify noise.

### A repeatable loop-shaping workflow

Start from a desired low-frequency behavior and choose integral action if zero steady-state offset is required. Identify the approximate desired crossover from bandwidth and speed requirements. At that frequency, inspect the uncompensated plant's phase; use lead compensation if more phase margin is needed. Add high-frequency roll-off to keep noise and neglected dynamics in check. Then check sensitivity peaking and all disturbance transfer paths.

Iterate: changing gain moves crossover, changing phase compensation often changes gain, and a filter can remove valuable phase near crossover. Record all assumptions, including uncertainty and delay. A finished frequency-domain design is a set of *verified transfer functions* and simulations, not simply a hand-drawn Bode magnitude curve.

## 10. A worked interpretation of frequency-domain bounds

Suppose a reference is effectively restricted below $15$ Hz, output disturbances must be suppressed below $5$ Hz, and a high-frequency disturbance above $30$ Hz must be strongly attenuated. The design may require $|T|\approx1$ in the reference band, $|S|\ll1$ in the low-frequency disturbance band, and $|T|\ll1$ in the high-frequency measurement-noise band. There must be a transition region; it cannot be arbitrarily sharp without considering the plant and robustness.

For example, a demand of $|S|<0.1$ below $5$ Hz imposes $|1+L|>10$. A demand of $|T|<0.1$ above $30$ Hz imposes $|L|<0.1|1+L|$. These are exact complex inequalities; simplified Bode magnitude boundaries should be regarded as approximations or conservative bounds.

### An inequality example with numerical targets

Suppose $|S|<0.05$ is needed at $0.1$ rad/s and $|T|<0.02$ is needed at $100$ rad/s. The first means at least $26$ dB of output-disturbance attenuation; in a high-loop-gain regime it suggests $|L|\gtrsim20$. The second is about $-34$ dB noise transmission; in a low-loop-gain regime it suggests $|L|\lesssim0.02$.

A loop must transition between these regimes while preserving sufficient phase margin. Increasing the crossover frequency may help low-frequency performance, but it can violate the high-frequency noise bound or excite plant resonances. The constraints are not incompatible merely because $S+T=1$: they apply at **different frequencies**. They would be incompatible if both magnitudes were required to be tiny at the same frequency.

## 11. Resonances and notch filters

A lightly damped mechanical mode often appears as a narrow gain peak around its natural frequency. A notch filter is intended to reduce loop gain around that frequency without unnecessarily lowering the loop at all other frequencies. A common form is

$$\boxed{C_{\rm notch}(s)=\frac{s^2+2\zeta_z\omega_n s+\omega_n^2}{s^2+2\zeta_p\omega_n s+\omega_n^2}.}$$

At $\omega=\omega_n$, the magnitude is approximately $\zeta_z/\zeta_p$. Choosing $\zeta_z<\zeta_p$ makes a notch. The notch depth is $20\log_{10}(\zeta_z/\zeta_p)$ dB; for example, a factor of $0.1$ gives a $-20$ dB notch.

A deep notch can reduce the impact of a known resonance, but the design should be checked for sensitivity to uncertainty in the resonant frequency and damping.

### A notch filter is a targeted tool

A second-order notch can be written

$$N(s)=\frac{s^2+2\zeta_z\omega_0s+\omega_0^2}{s^2+2\zeta_p\omega_0s+\omega_0^2},\qquad0<\zeta_z<\zeta_p.$$

At $\omega=\omega_0$, its magnitude is approximately $\zeta_z/\zeta_p$, so a small numerator damping yields a deep dip. The filter can suppress a narrow mechanical resonance without broadly reducing loop gain. But its poles and zeros also change phase around the notch. If the notch sits near crossover, it may harm stability margin, especially when resonance frequency varies with operating conditions.

## 12. Lead compensation: add phase near crossover

A phase-lead compensator has its zero at a lower frequency than its pole:

$$\boxed{C_{\rm lead}(s)=K\frac{1+s/a}{1+s/b},\qquad0<a<b.}$$

Its phase is $\tan^{-1}(\omega/a)-\tan^{-1}(\omega/b)$, which is positive over an intermediate range. Maximum phase lead occurs near $\omega_m=\sqrt{ab}$. If $\alpha=a/b\in(0,1)$, then

$$\phi_{\max}=\sin^{-1}\left(\frac{1-\alpha}{1+\alpha}\right).$$

Given a desired phase lead $\phi_{\max}$, solve

$$\alpha=\frac{1-\sin\phi_{\max}}{1+\sin\phi_{\max}},\quad a=\omega_m\sqrt\alpha,\quad b=\frac{\omega_m}{\sqrt\alpha}.$$

The pole at $b$ prevents the compensator's gain from increasing indefinitely. Lead compensation is a standard way to improve phase margin and shift crossover.

### Derive the lead network's phase boost

A standard lead compensator is $C_{lead}(s)=K(1+Ts)/(1+\alpha Ts)$ with $0<\alpha<1$. The zero at $1/T$ occurs before the pole at $1/(\alpha T)$, so the phase contribution is positive between them. Its maximum phase lead is

$$\phi_{\max}=\sin^{-1}\!\left(\frac{1-\alpha}{1+\alpha}\right),\qquad\omega_{\max}=\frac1{T\sqrt\alpha}.$$

For $\alpha=0.25$, the maximum lead is about $36.9^\circ$. Position $\omega_{\max}$ near the desired gain crossover, then retune the gain because the lead network also boosts magnitude. The compensator does not create free phase: at high frequency its magnitude rises by a factor of $1/\alpha$ before any additional roll-off is applied.

## 13. Lag compensation: increase relative low-frequency gain

A lag compensator places a pole below its zero:

$$\boxed{C_{\rm lag}(s)=K\frac{1+s/b}{1+s/a},\qquad0<a<b.}$$

It has a relatively high low-frequency gain compared with its high-frequency gain, but introduces some phase lag around the pole-zero interval. With appropriate scaling it can increase low-frequency accuracy without requiring the same gain increase at crossover. A common design principle is to place the lag pole and zero sufficiently below gain crossover to limit the loss of phase margin.

### Lag improves low-frequency accuracy relative to crossover

A typical lag network has a pole at a lower frequency than its zero: $C_{lag}(s)=K(1+s/\omega_z)/(1+s/\omega_p)$ with $0<\omega_p<\omega_z$, though normalization and gain conventions vary. Relative to its higher-frequency gain, its low-frequency gain is larger by $\omega_z/\omega_p$ when gains are normalized appropriately.

A practical design positions pole and zero well below crossover so the added phase lag near crossover is small. Unlike a lead compensator, lag generally does not supply phase margin; it trades a slow low-frequency gain improvement against additional lag and longer transient tails. Make sure any claimed improvement is measured relative to the actual retuned loop gain.

## 14. Proportional-integral control as a lag-like building block

A PI controller has

$$C_{PI}(s)=K_p+\frac{K_i}{s}=K_p\frac{s+K_i/K_p}{s}.$$

The integrator gives theoretically infinite DC gain and can eliminate step steady-state error in a stable Type 1 loop. Its zero adds phase recovery as frequency rises. PI control is often favored for slow regulation tasks when exact reference tracking or disturbance rejection at DC is required.

### PI control is a special useful pole-zero arrangement

The PI controller $K_p+K_i/s=K_p(s+K_i/K_p)/s$ places a pole at the origin and a real zero at $-K_i/K_p$. At frequencies well below the zero, the controller looks integral and has very large magnitude; above the zero, it approaches a proportional gain $K_p$. This is often exactly the shape wanted for zero step error without paying $-90^\circ$ of extra phase lag at arbitrarily high frequency.

Place the PI zero relative to crossover with care. A zero far above crossover leaves almost pure integral behavior at crossover and may damage phase margin. A zero appropriately below crossover lets the phase recover toward zero while keeping the DC benefit. Always check for windup if the actuator can saturate.

## 15. Why pure derivative control is rarely used alone

A pure differentiator $C(s)=K_d s$ has magnitude proportional to $\omega$; a small high-frequency measurement error can cause a large output. Practical derivative action is filtered, e.g.

$$C_D(s)=K_d\frac{s}{1+s/\omega_f}.$$

At frequencies above $\omega_f$, its magnitude no longer grows without bound. Derivative action contributes phase lead, but the inevitable filter pole determines how much improvement is available and how measurement noise is affected.

### Filter derivative action

Pure derivative $K_ds$ has unbounded gain as $\omega\to\infty$ and will respond strongly to high-frequency noise. A realizable approximation is

$$C_D(s)=\frac{K_ds}{1+s/\omega_f},$$

where $\omega_f$ is the derivative-filter corner. At frequencies below $\omega_f$, this behaves approximately like a differentiator; above it, the magnitude stops increasing indefinitely. The price is additional phase dynamics near the filter corner.

The filter is not merely a software implementation detail: it changes the loop transfer function and should appear in the Bode, Nyquist, and closed-loop calculations. Derivative-on-measurement is also frequently preferred to avoid a large control kick from a sharp reference step.

## 16. PID as a combination of lag and lead ideas

A PID controller combines proportional action, integral action, and derivative action:

$$C(s)=K_p+\frac{K_i}{s}+K_d s=\frac{K_ds^2+K_ps+K_i}{s}.$$

When its numerator is factored into two zeros, it can be viewed as an integrator and a pair of zeros; with a derivative filter included it becomes proper. Depending on the zero locations relative to crossover, the zeros help recover phase while the integrator improves low-frequency tracking. Thus PID is closely related to the lead/lag compensation principles studied in this lecture.

### PID is a designed frequency response, not three knobs alone

A PI component supplies strong low-frequency gain; a derivative or lead-like component can recover phase in the crossover region; and a high-frequency filter prevents unbounded noise gain. This is a useful way to understand PID tuning: shape the loop in three frequency bands rather than adjusting gains solely by trial and error.

Two PID controllers with the same nominal $K_p,K_i,K_d$ can behave differently if they use different derivative filters, setpoint weighting, anti-windup laws, or sample periods. State the exact implemented controller transfer function when analyzing stability margins. A continuous-time ideal PID formula is a starting abstraction, not a complete hardware specification.

## 17. Verify the design, do not stop at the Bode sketch

After choosing the controller, compute $L$, $S$, and $T$. Check Nyquist closed-loop stability, phase and gain margins, sensitivity peaking, reference tracking, output and input disturbances, measurement noise, and actuator effort. A Bode sketch is an efficient design aid; it is not a substitute for analyzing the actual closed-loop dynamics, nonlinear saturation, or uncertainty.

### Close the design loop with verification

Check closed-loop internal stability first, including any unstable or marginally stable plant modes. Then simulate reference steps, ramps if relevant, likely disturbances, and sensor noise. Check $S$, $T$, $GS$, and $CS$ over the frequencies specified by the requirements. Inspect peak output and actuator effort, not just steady-state values.

Finally perturb parameters such as plant gain, resonance frequency, and delay. A controller that only works for one perfectly known mathematical model is fragile. If a requirement is missed, diagnose which term caused it: insufficient low-frequency gain, poor phase margin, excessive high-frequency gain, or a nonminimum-phase limitation. This diagnosis should guide the next compensator change.


## Practice problems and worked solutions

### Problem 1 — A low-frequency bound

If output disturbances must be attenuated by $20$ dB at $\omega=0.2$ rad/s, what exact inequality is needed?

**Worked solution.** $|S(j0.2)|\le0.1$ because $20\log_{10}0.1=-20$ dB. If $|L|\gg1$, this approximately suggests $|L(j0.2)|\gtrsim10$, but the exact condition includes phase through $1+L$.

### Problem 2 — Design a lead magnitude ratio

A lead compensator uses $\alpha=0.25$. Compute its maximum phase lead.

**Worked solution.** $\phi_{max}=\sin^{-1}[(1-0.25)/(1+0.25)]=\sin^{-1}(0.6)\approx36.9^\circ$.

### Problem 3 — Notch depth

For a notch with $\zeta_z=0.02$ and $\zeta_p=0.2$, what is the approximate magnitude at its center?

**Worked solution.** At $\omega_0$, $|N(j\omega_0)|=\zeta_z/\zeta_p=0.1$, a $-20$ dB notch. The surrounding phase and robustness must still be checked.



## Exam mastery — Derive controller shapes, then verify limits

### Design lead compensation from a target phase boost

Take $C_{\rm lead}(s)=K\frac{1+s/\omega_z}{1+s/\omega_p}$ with $0<\omega_z<\omega_p$ and $\alpha=\omega_z/\omega_p\in(0,1)$. Its phase is $\phi(\omega)=\tan^{-1}(\omega/\omega_z)-\tan^{-1}(\omega/\omega_p)$. Differentiate this with respect to $\omega$ and set the derivative to zero. The maximum occurs at

$$\boxed{\omega_m=\sqrt{\omega_z\omega_p}},\qquad\boxed{\sin\phi_{\max}=\frac{1-\alpha}{1+\alpha}}.$$

For a 30° boost, solve $\alpha=(1-\sin30^\circ)/(1+\sin30^\circ)=1/3$. If the desired boost should center at 10 rad/s, choose $\omega_z=10\sqrt\alpha\approx5.77$ and $\omega_p=10/\sqrt\alpha\approx17.32$ rad/s. Lead also raises magnitude across its transition, shifting crossover; always recalculate the true phase margin after inserting it.

### Design lag while preserving DC accuracy

For an example fitted plant $G(s)=0.1/(1+s/10)^2$, step error $0.1$ requires $KG(0)=9$, hence $K=90$. Pure proportional control crosses around $28.3$ rad/s with $PM\approx39^\circ$, below a 60° target. A lag network

$$C(s)=90\frac{1+s/0.3}{1+s/0.06}$$

has the same $C(0)=90$ but a high-frequency factor of $0.2$. Its crossover moves near $8.95$ rad/s, where the plant phase is less lagged, so total margin exceeds 90° for this fitted plant. This solved final-exam pattern teaches a crucial principle: **a compensator's low-frequency gain and gain near crossover can be designed separately**.

### Frequency bounds imply opposite gain requirements

For output disturbance rejection $|S|\le\epsilon$, the exact condition is $|1+L|\ge1/\epsilon$. For sensor noise rejection $|T|\le\epsilon$, the exact condition is $|L|\le\epsilon|1+L|$. Far below crossover, $|L|\gg1$ typically makes $S$ small; far above crossover, $|L|\ll1$ typically makes $T$ small. Around crossover, you must shape phase and slope to keep both peak sensitivities under control. Problems asking for **all** frequencies are often constrained by the waterbed effect and plant nonminimum-phase zeros.



---

<!-- Exam-ready derivation lab — HTML supplement; editable, preserved exactly as on the web page. -->

<section class="mastery-lab" id="deep-derivation"><p class="lab-kicker">Turn prose into inequalities</p><h2>Derivation lab: disturbance and noise specifications are different</h2>
<p>Let <span class="math">\(L=CG\)</span>, <span class="math">\(S=(1+L)^{-1}\)</span>, and <span class="math">\(T=L/(1+L)\)</span>. For an <em>additive output disturbance</em> that must be suppressed by a factor of ten around a vibration frequency <span class="math">\(\omega_f\)</span>, write</p>
<div class="math-block">\[\left|\frac{Y(j\omega_f)}{D_o(j\omega_f)}\right|=|S(j\omega_f)|\le0.1\iff |1+L(j\omega_f)|\ge10.\]</div>
<p>If the same system must not follow sensor noise or interfere with rigid-body behavior below <span class="math">\(0.1\omega_f\)</span>, request <span class="math">\(|T(j\omega)|\ll1\)</span> throughout that lower band. When <span class="math">\(|L|\ll1\)</span>, <span class="math">\(|T|\approx|L|\)</span>; near the target vibration, <span class="math">\(|L|\)</span> must instead be large enough—and have a safe phase—to create a small <span class="math">\(S\)</span>.</p>
<p>To guarantee <span class="math">\(|S|\le0.1\)</span> <em>regardless of phase</em>, use the reverse triangle inequality <span class="math">\(|1+L|\ge||L|-1|\)</span>; the conservative sufficient bound <span class="math">\(|L|\ge11\)</span> follows. A narrow band-pass-like loop shape can meet these opposing constraints, but a full Nyquist check is still essential.</p>
<details class="quick-check"><summary>Is \(|L|\ge10\) sufficient for a tenfold output-disturbance reduction at every phase?</summary><p>No. If <span class="math">\(L\approx-10\)</span>, the sensitivity is <span class="math">\(1/9\)</span>, just above 0.1. The exact condition is <span class="math">\(|1+L|\ge10\)</span>.</p></details><p class="exam-link">See <a href="homework-07.html">Homework 7, Problem 1.2</a> and <a href="final.html">Final Problem 3</a>.</p></section>
