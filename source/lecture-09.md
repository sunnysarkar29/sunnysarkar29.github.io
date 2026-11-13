# Lecture 9: Controller design and root locus

This lecture connects a list of real engineering requirements to a practical loop transfer function. It revisits the Nyquist treatment of integrators, works through a controller-design example, and introduces the root-locus method for visualizing how the closed-loop poles move when a gain changes.

## 1. The Nyquist contour when the loop has integrators

An integrator contributes a pole at $s=0$, which lies on the usual imaginary-axis segment of a Nyquist stability contour. We cannot simply run a contour through that singularity. Instead, we indent the contour around the pole using a tiny semicircle and map that indentation through the loop transfer function.

For $L(s)\sim K/s^q$ near the origin,

$$L(\varepsilon e^{j\theta})\sim\frac{K}{\varepsilon^q}e^{-jq\theta}.$$

As $\varepsilon\to0$, the mapped arc moves to very large magnitude and rotates through an angle proportional to $q$. Ignoring this piece may cause an incorrect count of Nyquist encirclements. The right way to treat the integrator is to deform the contour, not to declare it absent.

### Why integrators require a special Nyquist path

A pole of $L(s)$ at the origin means $L(j\omega)$ becomes unbounded as $\omega\to0$. The usual Nyquist contour is therefore indented around $s=0$ with a tiny semicircle in the right-half plane. For a factor $1/s$, the indentation's complex-plane image becomes a large arc. Leaving that arc out can change the apparent winding count.

Rather than memorizing a picture, parameterize the indentation as $s=\epsilon e^{j\theta}$ with $\epsilon\to0^+$; then $1/s=\epsilon^{-1}e^{-j\theta}$. The large magnitude and changing angle explain why the image travels around a distant arc. The correct contour and orientation must be kept consistent with the Nyquist counting convention.

## 2. Two ways to create a controller

One conceptually direct strategy is to select a desirable loop transfer function $L_{des}$ and then solve

$$\boxed{C(s)=\frac{L_{des}(s)}{G(s)}.}$$

This works algebraically but can yield an impractical or unstable compensator, especially when it asks the controller to cancel right-half-plane plant zeros, differentiate excessively, or invert poorly modeled dynamics. Such cancellation can hide unstable internal behavior.

The more practical iterative method starts with the plant $G(s)$, adds controller building blocks—gain, integrators, lead, lag, notch, and filters—and repeatedly checks the resulting loop response. The goal is to satisfy the full list of requirements, not merely to achieve a visually attractive Bode plot.

### Compare design in the time and frequency domains

A time-domain design might specify desired dominant poles from settling time and damping ratio, then place or steer poles using gains and zeros. A frequency-domain design instead chooses loop magnitude and phase so bandwidth, sensitivity, and stability margins meet the requirements. The approaches are not competitors: they describe the same closed-loop dynamics from different perspectives.

Root locus is especially useful when a small number of parameters, often scalar gain, are varied. Loop shaping is better when the desired gain-versus-frequency profile is the primary concern. A practical design often alternates between them: use pole geometry to select a target, a lead compensator to shape phase, then verify the actual transient and margins.

## 3. The lecture's example plant and requirements

The handwritten design example begins with

$$\boxed{G(s)=\frac{10}{s(s+3)}.}$$

It has one integrator and a real pole at $-3$. The problem lists six objectives: roughly $4$ rad/s or higher closed-loop bandwidth; zero steady-state error for a step reference; zero steady-state error for a step disturbance entering ahead of the plant; gain margin at least $6$ dB and phase margin at least $45^\circ$; attenuation of a low-frequency input disturbance by at least a factor of ten in the specified $0.5$–$1$ rad/s range; and less than $10\%$ step overshoot.

These requests must be translated into equations involving the proper closed-loop transfer paths and then checked together. Some are compatible immediately; others may require the controller to shape gain and phase in different frequency bands.

### Start every numerical design by listing constraints

Before choosing $C(s)$, convert the desired tracking, disturbance rejection, overshoot, settling time, gain margin, and phase margin into mathematical statements. For example, a $2\%$ settling deadline $t_s\le2$ s suggests $\zeta\omega_n\gtrsim2$ rad/s for a dominant second-order approximation. A maximum $10\%$ overshoot suggests $\zeta\gtrsim0.59$.

Disturbance bounds belong to the particular disturbance transfer function, not automatically to $S$. Once the plant is fixed, plot $G(j\omega)$ and mark which inequalities it already satisfies and which require control action. This step prevents blindly selecting PID gains without knowing what part of the requirement they are intended to address.

## 4. Step tracking and type for this plant

The plant $10/[s(s+3)]$ already has one pole at the origin. If $C(0)$ is finite and nonzero and the closed loop is stable, the loop is Type 1 and its unit-step tracking error is zero:

$$E(s)=\frac{R(s)}{1+C(s)G(s)},\qquad R(s)=\frac1s,$$

$$e_{ss}=\lim_{s\to0}\frac{1}{1+C(s)G(s)}=0.$$

Thus the original plant's integrator already satisfies the step-reference error condition in the stable case. It would be a mistake to add another integrator without first considering the other tracking and disturbance objectives.

### Zero step error does not imply arbitrary disturbance rejection

For a standard unity-feedback system, type-1 open-loop behavior usually makes the final error to a constant reference zero, if the closed loop is stable. But a constant disturbance entering before the plant sees $GS$, which may have a different low-frequency limit than the reference error. A disturbance entering after the plant sees $S$.

For a plant with a pole at the origin, the plant itself may contain an integrator while the controller does not. Whether that integration suppresses an input disturbance depends on cancellation and the exact signal injection. Derive $Y/D$ first and use the final-value theorem on *that* path. Counting integrators in $L$ alone is not enough for every disturbance specification.

## 5. Why the disturbance injection point changes the required system type

For a disturbance $d_i$ added before the plant, the output is

$$Y_{d_i}=\frac{G}{1+CG}D_i.$$

With the reference held at zero and a **step input disturbance** $D_i=1/s$, its final output offset is

$$y_{ss,d_i}=\lim_{s\to0}\frac{G(s)}{1+C(s)G(s)}.$$

When $|CG|\to\infty$ at low frequency, this approaches $1/C(s)$, not necessarily zero. If the controller is only proportional, the result can be a nonzero offset despite the plant's integrator. To eliminate a constant disturbance injected before the plant, **integral action in the controller** is typically required:

$$C(s)\sim\frac{K_i}{s}\quad\Longrightarrow\quad\frac{G}{1+CG}\sim\frac{s}{K_i}\to0.$$

This distinction is easy to miss when one quotes system type without identifying the exact input-output path.

### Disturbance position changes the necessary internal model

Suppose the disturbance enters the plant input as $d_i$, so $Y/D_i=G/(1+CG)$. At low frequency with large $|CG|$, this approaches $1/C$, not automatically zero. If the controller has finite DC gain, a constant plant-input disturbance can leave a nonzero offset even if the plant contains an integrator.

If the controller itself contains integral action, then $|C(j\omega)|\to\infty$ as $\omega\to0$, making $1/C\to0$ under the large-loop-gain approximation. This is why adding a controller integrator may be necessary for robust rejection of a constant actuator-side disturbance. The relevant “system type” must be interpreted against the exact input/output map and assumed stability.

## 6. A stronger requirement for low-frequency input disturbances

A factor-of-ten attenuation means $|Y_{d_i}/D_i|=|GS|\lesssim0.1$ over the stated disturbance band. Since

$$GS=\frac{G}{1+CG},$$

in the high-loop-gain regime $GS\approx 1/C$. Thus increasing the controller's gain in this region can reduce plant-input disturbance effects. But because the controller also shapes $L=CG$, the gain cannot be increased without rechecking phase margin, bandwidth, and high-frequency behavior.

### A low-frequency design bound from plant-input disturbances

From $Y/D_i=G/(1+CG)$, requiring $|Y/D_i|\le\epsilon$ means $|G/(1+CG)|\le\epsilon$. In a frequency band where $|CG|\gg1$, this simplifies to $|1/C|\lesssim\epsilon$. The controller needs sufficient magnitude at those frequencies, not merely a favorable closed-loop reference ratio.

For example, if a unit-amplitude slowly varying actuator disturbance must produce less than $0.02$ output amplitude in this approximation, controller magnitude near that frequency should be on the order of $50$ or larger (in the appropriate physical units). Verify with the exact formula; phase can make $|1+CG|$ much smaller than $|CG|$ near crossover.

## 7. Gain margin, phase margin, and overshoot in the same design

The required gain margin is expressed as

$$\mathrm{GM}_{\mathrm{dB}}\ge6,\quad\text{equivalently}\quad \mathrm{GM}\gtrsim2.$$

The phase-margin requirement is $\mathrm{PM}\ge45^\circ$ at an appropriate crossover. Overshoot less than $10\%$ suggests a damping ratio around $\zeta\gtrsim0.59$ when a dominant second-order model is reasonable, since

$$M_p=\exp\!\left(-\frac{\pi\zeta}{\sqrt{1-\zeta^2}}\right).$$

A phase-margin requirement does not mathematically guarantee this overshoot bound for a general higher-order system. The time-domain response must be checked separately.

### Combining overshoot and margins takes iteration

The phase-margin target gives a way to influence closed-loop damping, but it is not an exact overshoot equation for an arbitrary plant. First use dominant-pole or second-order reasoning to set a desired damping ratio. Then choose the crossover and lead/lag shape to obtain useful phase margin. After closing the loop, compute the actual transient and revise the controller if overshoot or settling time is unacceptable.

A prefilter $F(s)$ in the reference path can improve reference tracking shape by changing $Y/R=F T$ without changing the feedback characteristic equation. It does **not** fix poor disturbance rejection or an internally unstable feedback loop. This distinction matters when a reference step overshoots but feedback stability and robustness are otherwise satisfactory.

## 8. Why a lead compensator or prefilter may be needed

Adding integral action can help low-frequency disturbance rejection but increases phase lag near low frequencies. A lead compensator may restore the phase needed near gain crossover:

$$C(s)=K\frac{s+z}{s(s+p)},\qquad 0<z<p,$$

where the displayed form includes integral action and a lead zero/pole pair. A reference prefilter $F(s)$ placed only on the command path can reshape reference tracking without changing the loop transfer function $L=CG$; however, it does not by itself improve rejection of disturbances entering inside the feedback loop.

A sensible sequence is to tune low-frequency controller behavior for steady-state requirements, shape the crossover for margins and bandwidth, and then use a reference prefilter if the step response still overshoots or has undesirable command dynamics.

### Lead, lag, and prefilters solve different problems

Use lead compensation to add positive phase near crossover and often increase usable bandwidth. Use lag or PI action to improve low-frequency accuracy while placing its phase penalty appropriately. Use a prefilter to shape only the reference command path, for example to avoid exciting a resonant closed loop with a sharp step.

For a first-order prefilter $F(s)=\omega_f/(s+\omega_f)$, choosing a smaller $\omega_f$ smooths the command but slows its rise. Since $F$ lies outside the feedback loop, the denominator $1+CG$ is unchanged. Therefore prefilter tuning cannot create stability margin; it can only alter what reference components reach the controlled system.

## 9. Root locus: the closed-loop pole locations as gain varies

Root locus plots the closed-loop poles for a family of loops of the form

$$L(s)=K L_0(s),\qquad K\ge0.$$

The poles solve the characteristic equation

$$\boxed{1+K L_0(s)=0.}$$

If $L_0(s)=N(s)/D(s)$, the closed-loop characteristic polynomial is $D(s)+K N(s)$. As $K$ increases from zero toward infinity, the roots trace curves in the complex $s$-plane. Root locus is therefore a systematic way to study how proportional gain changes stability and response speed.

### Why poles travel as gain varies

For a unity-feedback loop $L(s)=KG_0(s)$, the closed-loop characteristic equation is $1+KG_0(s)=0$. As $K$ moves from zero toward large values, its roots generally move continuously in the complex plane, tracing the **root locus**. Every point on the locus is a candidate closed-loop pole for some nonnegative gain.

The geometry reveals which gains yield stable poles, which gains produce oscillation, and whether a desired damping-ratio ray is reachable. A locus is not a trajectory of the system's physical output over time; it is a map of *possible characteristic roots* across parameter values. That conceptual distinction avoids one of the most common misunderstandings in early root-locus problems.

## 10. Magnitude and angle conditions

At a root-locus point $s_*$, the characteristic equation requires

$$K L_0(s_*)=-1.$$

Its magnitude and argument give two conditions:

$$\boxed{K=\frac1{|L_0(s_*)|},\qquad\arg L_0(s_*)=(2k+1)180^\circ.}$$

For an open-loop rational function with poles $p_i$ and zeros $z_j$, the angle criterion is

$$\sum_j\arg(s_*-z_j)-\sum_i\arg(s_*-p_i)=(2k+1)180^\circ.$$

This determines which points in the plane belong to the positive-gain root locus; the magnitude condition gives the corresponding gain.

### Separate angle and magnitude conditions

From $1+KG_0(s)=0$, we require $KG_0(s)=-1$. For positive real $K$, this gives $\arg G_0(s)=(2k+1)180^\circ$ and $K=1/|G_0(s)|$. The **angle condition** decides whether a proposed point lies on the locus; the **magnitude condition** gives the corresponding gain.

For $G_0(s)=1/[s(s+3)]$, test $s=-1.5+j2$. The vector angles from poles at $0$ and $-3$ sum to $180^\circ$, so the point lies on a positive-gain locus. The gain is $|s(s+3)|=|(-1.5+j2)(1.5+j2)|=6.25$. This is a fast way to check an intended pole location without solving a polynomial for every gain.

## 11. The number, start points, and end points of branches

If the open-loop transfer function has $n$ poles and $m$ finite zeros, there are $n$ root-locus branches. As $K\to0^+$, branches begin at the open-loop poles. As $K\to\infty$, $m$ branches terminate at finite open-loop zeros, while $n-m$ branches approach infinity when $n>m$.

This result can be understood from $D(s)+KN(s)=0$: for very small $K$ the dominant equation is $D(s)=0$, and for large $K$ the finite roots approach $N(s)=0$.

### Understand branch endpoints as $K$ changes

If $G_0(s)=N(s)/D(s)$ has $n$ open-loop poles and $m$ finite zeros, the root locus has $n$ branches, assuming no pathologies. As $K\to0$, the branches start at poles of $G_0$; as $K\to\infty$, $m$ branches approach finite zeros and the remaining $n-m$ head toward infinity.

For a two-pole, no-zero plant, two branches must start at those poles and ultimately go to infinity. They may first move along the real axis, meet at a breakaway, and then become a complex-conjugate pair. Root-locus symmetry about the real axis follows from real polynomial coefficients. Count poles and zeros before sketching any line.

## 12. Real-axis rule for simple negative-feedback root loci

A point on the real axis belongs to the positive-gain root locus when the number of **real** open-loop poles and zeros to its right, counted with multiplicity, is odd. The rule follows from the angle criterion because each real factor to the right contributes an angle of $180^\circ$ on the chosen branch.

Mark all real open-loop poles and zeros on a number line, divide the line into intervals, and count factors to the right of a test point in each interval. This is more reliable than guessing where lines connect.

### A real-axis test you can do in seconds

For the conventional positive-gain negative-feedback locus with real poles and zeros, a point on the real axis belongs to the locus if the number of **real** open-loop poles and zeros strictly to its right is odd, counting multiplicities. For poles at $0$ and $-3$, the segment $(-3,0)$ has one pole to the right and is on the locus; the interval $(-\infty,-3)$ has two and is not.

This rule is an angle-condition shortcut. It assumes the standard positive-$K$ root locus; a negative-gain locus uses a different angle condition. Complex conjugate pairs make a net multiple of $360^\circ$ contribution to the real-axis angle test, so the usual odd-count rule still works for real-axis segments.

## 13. Asymptotes for branches traveling to infinity

When $n>m$, the number of asymptotes is $n-m$. Their real-axis intersection is the **centroid**

$$\boxed{\sigma_a=\frac{\sum_{i=1}^{n}p_i-\sum_{j=1}^{m}z_j}{n-m},}$$

where complex-conjugate pairs have real sums, and the sum is over all finite poles and zeros. The asymptote angles are

$$\boxed{\theta_q=\frac{(2q+1)180^\circ}{n-m},\qquad q=0,1,\ldots,n-m-1.}$$

Asymptotes describe the *far-field direction* of branches, not the exact branch shape close to the poles.

### Calculate asymptotes instead of guessing their directions

When $n>m$, the $n-m$ infinite branches approach asymptotes centered at

$$\sigma_a=\frac{\sum p_i-\sum z_i}{n-m},\qquad\theta_k=\frac{(2k+1)180^\circ}{n-m}.$$

For $G_0=1/[s(s+3)]$, $n-m=2$, the centroid is $(-3)/2=-1.5$, and the asymptote angles are $90^\circ$ and $270^\circ$. Thus after meeting, the branches proceed vertically up and down through $\operatorname{Re}(s)=-1.5$.

Asymptotes describe the directions of branches **far away** at large gain. They do not mean that every branch lies on a straight line at all gains, and they are not additional poles or zeros.

## 14. Worked root-locus example: $G(s)=10/[s(s+3)]$

With unity negative feedback and gain $K$, the characteristic equation is

$$1+K\frac{10}{s(s+3)}=0\quad\Longleftrightarrow\quad s^2+3s+10K=0.$$

The closed-loop poles are

$$\boxed{s_{1,2}(K)=\frac{-3\pm\sqrt{9-40K}}2.}$$

At small gain there are two real negative poles, beginning at $0$ and $-3$ for $K=0$. At $K=9/40$ they meet at $-1.5$, then become a complex-conjugate pair whose real part stays at $-1.5$ as gain increases. The real-axis locus lies between $-3$ and $0$, where one real open-loop pole lies to the right. There are two infinite branches, with centroid $-1.5$ and angles $\pm90^\circ$.

The poles do not move further left after they become complex: increasing $K$ raises the oscillation frequency without improving the exponential decay rate. This is a useful illustration of why increasing proportional gain indefinitely is not synonymous with faster settling.

### Solve the complete two-pole example

With $G_0(s)=10/[s(s+3)]$ and scalar gain $K$, the characteristic equation is $s(s+3)+10K=0$, or $s^2+3s+10K=0$. Thus

$$s_{1,2}=\frac{-3\pm\sqrt{9-40K}}2.$$

For $K<9/40$, both poles are real and lie between $-3$ and $0$; at $K=9/40$ they meet at $-1.5$; for larger $K$ they form $-1.5\pm j\sqrt{40K-9}/2$. Increasing gain raises oscillation frequency while keeping the real part fixed at $-1.5$. For this ideal model the closed loop remains stable for every $K>0$, but its damping ratio decreases with gain, so overshoot can grow.

## 15. Complex root-locus branches and design checks

When open-loop poles occur in conjugate pairs, the root locus is symmetric about the real axis. Departure angles near complex poles can be found from the angle criterion, but the five basic sketching rules provide an efficient first picture: count branches; mark starting poles and ending zeros; determine real-axis segments; compute centroid and asymptote directions; and enforce conjugate symmetry.

Additional exact tools include setting $dK/ds=0$ to locate candidate breakaway points, solving for imaginary-axis crossings by Routh-Hurwitz or substitution $s=j\omega$, and using numerical roots to verify a hand sketch. Controller design should then be checked against the original frequency and disturbance requirements, not only against root-locus geometry.

### Root locus is a proposal generator, not the final test

A candidate pole pair may satisfy a settling-time and damping-ratio region, but other closed-loop poles, zeros, and actuator limits can still spoil the response. After selecting a gain from root locus, compute the exact closed-loop transfer function and simulate the reference and disturbance responses. For complex desired poles, verify both the angle condition and the positive real gain from the magnitude condition.

If the desired point is not on the uncompensated locus, a compensator zero or pole can change the angle geometry so that it becomes reachable. This is the core use of lead compensation with root locus: add the missing angle at the target point, then select gain to satisfy magnitude. Finally revisit frequency-domain robustness as well.


## Practice problems and worked solutions

### Problem 1 — Root locus breakaway

For $G_0(s)=1/[s(s+3)]$, find the real-axis breakaway and gain.

**Worked solution.** $K(s)=-s(s+3)$. Setting $dK/ds=-(2s+3)=0$ gives $s=-1.5$. Then $K=2.25$, which lies on the positive-gain real-axis locus.

### Problem 2 — Root locus with a scale factor

For $G_0(s)=10/[s(s+3)]$, at what $K$ do the real branches meet?

**Worked solution.** $s^2+3s+10K=0$ has repeated roots when $9-40K=0$, so $K=9/40=0.225$. Both roots are at $-1.5$.

### Problem 3 — Prefilter versus feedback

Can a reference prefilter repair an unstable feedback loop?

**Worked solution.** No. A prefilter changes the reference-to-output numerator, such as $Y/R=FT$, but not the internal feedback characteristic equation $1+CG=0$. Stabilize the feedback loop first.



## Exam mastery — Root locus from the characteristic equation

### The angle and magnitude conditions

With negative feedback, a candidate closed-loop pole $s_d$ satisfies $1+KG_0(s_d)=0$, so $KG_0(s_d)=-1$. Therefore $\angle G_0(s_d)=(2k+1)180^\circ$ and $K=1/|G_0(s_d)|$ when $K>0$. If $G_0=N/D$, the angle is the sum of vectors from zeros to $s_d$ minus the sum from poles to $s_d$. This derives the pole-zero construction rules rather than treating them as an arbitrary sketch recipe.

### Count branches, endpoints, and asymptotes

There is one branch per open-loop pole. With $n$ poles and $m$ finite zeros, $n-m$ branches go to infinity. Their negative-feedback asymptote angles are $\theta_q=(2q+1)180^\circ/(n-m)$ and meet at centroid $\sigma_a=(\sum p_i-\sum z_i)/(n-m)$. The real-axis rule counts **real poles and zeros to the right** of the candidate point: odd count means the point is on the negative-feedback locus.

### The lead-controller overshoot trap

Homework 8 uses $G=10/(s^2-1.5s+25)$ and $C=K(s+5)/(s+50)$. Construct the characteristic cubic and check Routh before sketching; the stable range is $K>8.4483$. At $K\approx65$, the complex poles have second-order damping $\zeta\approx0.594$, but the exact closed-loop transfer function retains a zero at $-5$ and overshoots about 63% for a step. A root-locus damping-grid label is only a **pole-based approximation**, not an invariant overshoot bound for arbitrary numerator dynamics.

**Practice.** For $G_0=(s-2)/(s^2+10s+100)$, negative feedback gives $D+KN=s^2+(10+K)s+(100-2K)$. A closed-loop pole reaches the origin when $K=50$. A positive feedback sign gives $D-KN$, and marginal oscillation occurs when $K=10$. Both answers come from simple coefficient inspection and should match your sketches.



---

<!-- Exam-ready derivation lab — HTML supplement; editable, preserved exactly as on the web page. -->

<section class="mastery-lab" id="deep-derivation"><p class="lab-kicker">Controller poles move the root locus</p><h2>Derivation lab: why lead can stabilize a plant that gain alone cannot</h2>
<p>Homework 8 uses the unstable plant <span class="math">\(G(s)=10/(s^2-1.5s+25)\)</span>. With a proportional controller, the characteristic polynomial is <span class="math">\(s^2-1.5s+(25+10K)\)</span>. Its <span class="math">\(s\)</span> coefficient is negative for every <span class="math">\(K\)</span>; no proportional gain makes all poles stable.</p>
<p>Now add the specified lead form <span class="math">\(C(s)=K(s+5)/(s+50)\)</span>. The characteristic polynomial becomes</p>
<div class="math-block">\[(s+50)(s^2-1.5s+25)+10K(s+5)=s^3+48.5s^2+(10K-50)s+(1250+50K).\]</div>
<p>Routh–Hurwitz requires positive coefficients and</p>
<div class="math-block">\[48.5(10K-50)&gt;(1250+50K)\quad\Longleftrightarrow\quad\boxed{K&gt;\frac{3675}{435}\approx8.448}.\]</div>
<p>That establishes an allowable stable region for <span class="math">\(K&gt;0\)</span>, but does not guarantee any chosen transient overshoot. The closed-loop transfer function contains a zero at <span class="math">\(-5\)</span>; overshoot formulas based only on a dominant complex pole pair can be misleading when this zero has appreciable influence.</p>
<details class="quick-check"><summary>Why is placing the dominant poles at a 10% damping ratio not the last step?</summary><p>That rule assumes a nearly zero-free second-order closed loop. The added lead zero changes the numerator and the step-response residues, so the actual step response must be computed and checked.</p></details><p class="exam-link">Verify numerically in <a href="homework-08.html">Homework 8, Problem 1</a>.</p></section>
