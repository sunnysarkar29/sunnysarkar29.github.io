# Lecture 7: Nyquist stability, gain and phase margins, and loop shaping

The Nyquist criterion is the bridge between an open-loop frequency response and the stability of a closed-loop feedback system. It is especially powerful when the open loop already contains unstable poles. This lecture develops the argument-principle interpretation, defines gain and phase margins, and explains why loop shaping can improve tracking and disturbance rejection only within robustness constraints.

## 1. The closed-loop stability question

For a unity negative-feedback loop,

$$L(s)=C(s)G(s),\qquad T(s)=\frac{L(s)}{1+L(s)},\qquad S(s)=\frac1{1+L(s)}.$$

Closed-loop poles are zeros of $1+L(s)$ after taking proper account of the internal system and possible cancellations. Merely looking at the poles of $L$ does not determine closed-loop stability. The critical condition is

$$\boxed{1+L(s)=0\quad\Longleftrightarrow\quad L(s)=-1.}$$

Thus the special complex number $-1+j0$ is the *critical point* on the Nyquist plot. The way the loop-frequency curve winds around it is connected to the locations of the closed-loop poles.

### Stability becomes a question about $1+L$

In unity negative feedback, the closed-loop characteristic equation is $1+L(s)=0$. A closed-loop pole at $s=s_\star$ therefore requires $L(s_\star)=-1$. The Nyquist method traces the values of $L(s)$ along a contour in the complex $s$-plane and uses how that image winds around $-1$ to infer how many unstable closed-loop poles exist.

This is powerful because the loop transfer may contain delays or complicated factors that make direct polynomial root calculations inconvenient. It is also easy to misuse: the Nyquist plot is not merely a picture of whether the curve touches $-1$; the **number and direction of encirclements** matter, as does the number of unstable open-loop poles.

## 2. Cauchy's argument principle

Let $F(s)$ be meromorphic and have no poles or zeros on a closed contour $\Gamma$. As $s$ moves around $\Gamma$ **counterclockwise**, the complex value $F(s)$ winds around the origin a net number of times equal to

$$N_{\mathrm{CCW}}=Z-P,$$

where $Z$ and $P$ are, respectively, the number of zeros and poles of $F$ within the contour, counted with multiplicity. With a **clockwise** parameterization of the contour, the corresponding winding number changes sign. This is a purely complex-analysis statement, not a special property of mechanical control systems.

Apply the theorem to $F(s)=1+L(s)$. A zero of $F$ is a closed-loop pole. The image $F(\Gamma)$ encircling the origin is equivalent to $L(\Gamma)$ encircling $-1$, because $F=1+L$ is a translation by one unit in the complex plane.

### The argument principle in one sentence

For a meromorphic function $F(s)$ with no zeros or poles on a closed contour, the net change in its complex argument as the contour is traversed is $2\pi$ times the number of enclosed zeros minus enclosed poles. Apply it to $F(s)=1+L(s)$. A zero of $F$ is a closed-loop characteristic root; a pole of $F$ is an open-loop pole, absent pathological cancellations.

Why does the plot of $L$ use $-1$ rather than the origin? Because $F=1+L$ translates the Nyquist image by one unit to the right. Winding of $F$ around zero is exactly winding of $L$ around $-1$. This geometric translation is the conceptual bridge from complex analysis to a practical stability test.

## 3. The right-half-plane Nyquist contour

The usual continuous-time stability test surrounds the open right-half of the $s$-plane with a contour that follows the imaginary axis and closes at very large radius in the right half-plane. If $L$ is proper, the image of the large-radius arc is typically simple to handle. Poles on the imaginary axis require small indentations rather than passing directly through singularities.

Define $P$ as the number of open-loop right-half-plane poles and $Z$ as the number of right-half-plane zeros of $1+L$. If the entire **$s$-plane contour is traversed clockwise**, and $N_{\mathrm{CW}}$ is the signed number of clockwise windings of $L(\Gamma)$ around $-1$, then

$$\boxed{Z=P+N_{\mathrm{CW}}.}$$

For this convention, a counterclockwise winding contributes $-1$. If you use a differently oriented contour or reverse the encirclement sign convention, the reported equation changes accordingly, but the number of unstable closed-loop roots $Z$ does not.

### The contour must be oriented and avoid singularities

One common Nyquist contour surrounds the entire right-half $s$-plane, traveling up the imaginary axis and closing through a large right-half-plane semicircle. Depending on the precise traversal convention, clockwise and counterclockwise winding signs differ. State your convention before using a count formula.

If the open loop contains a pole at $s=0$, the contour cannot pass straight through it. Detour around the origin using a tiny semicircle into the right half-plane, and include the image of that detour when completing the Nyquist argument. Ignoring it is a common reason for incorrect encirclement counts for integrator-containing loops.

## 4. Stability from the Nyquist count

The closed loop is asymptotically stable, under the ordinary hypotheses and absent hidden unstable cancellations, if and only if $Z=0$. Under the convention above, that requires

$$\boxed{N_{\mathrm{CW}}=-P.}$$

If the open loop has no right-half-plane poles ($P=0$), then its complete Nyquist curve must have **zero net encirclements** of $-1$ for closed-loop stability. If $P=1$, a stable closed loop requires one net counterclockwise encirclement under this particular contour orientation. This is why a simple rule such as “never encircle $-1$” is not correct for every plant.

A Nyquist path with a point exactly at $-1$ corresponds to a closed-loop pole on the imaginary axis and is a marginal case; ordinary positive stability margins disappear there.

### Use one clear sign convention

With the convention that $N_{cw}$ is the **clockwise encirclement count of $-1$ by the image of a right-half-plane contour oriented clockwise**, the argument principle yields $N_{cw}=Z-P$, where $Z$ is the number of enclosed closed-loop right-half-plane characteristic roots and $P$ is the number of enclosed open-loop right-half-plane poles. Other textbooks orient their contour differently, leading to sign-reversed formulas.

The invariant statement is simpler: count the image winding consistently and combine it with the known unstable open-loop pole count to obtain the closed-loop count. If $P=0$, closed-loop stability requires no net encirclement of $-1$ under either standard convention. If $P>0$, some appropriate winding is required; absence of an encirclement is **not** enough.

## 5. Counting encirclements correctly

The signed encirclement count is a topological property of the **whole completed contour**. A hand sketch of only the positive-frequency branch may be insufficient. For real rational systems, the negative-frequency branch is its mirror image in the real axis, but the direction of traversal still matters.

A practical procedure is to determine the open-loop right-half-plane pole count $P$, complete the Nyquist contour (including detours around imaginary-axis poles), track direction, and count encirclements of $-1$. Then compute $Z$ and verify that $Z=0$. You can compare with a direct closed-loop pole calculation as a consistency check.

### Two sanity checks before counting

First mark the frequency direction on the Nyquist plot. Encircling a point once clockwise and once counterclockwise gives net winding zero. Second mark the number of poles of $L$ in the right-half plane. A loop with an unstable open-loop pole cannot be judged by the same no-encirclement shortcut as a stable open loop.

For a simple stable loop $L(s)=K/(s+1)$ with $K>0$, the positive-frequency Nyquist curve stays in the right half of the complex plane and cannot wrap around $-1$. The closed-loop pole is $-(1+K)$, confirming stability. For more complicated loops, use the Nyquist count to test what the polynomial calculation would otherwise reveal directly.

## 6. Gain crossover and phase crossover

Two special frequencies summarize a Bode stability-margin calculation. A **gain crossover frequency** $\omega_{gc}$ satisfies

$$\boxed{|L(j\omega_{gc})|=1\quad(0\ \mathrm{dB}).}$$

A **phase crossover frequency** $\omega_{pc}$ satisfies

$$\boxed{\arg L(j\omega_{pc})=-180^\circ\pmod{360^\circ}.}$$

These are properties of the **open-loop transfer function** $L$, not automatically of $T$ or $S$. A loop can have multiple gain and phase crossovers, in which case a single informal margin value may hide the important stability limitation. Plotting the complete Nyquist trajectory remains the more reliable test.

### Gain crossover and phase crossover are different events

Gain crossover $\omega_{gc}$ occurs where $|L(j\omega)|=1$ (the Bode magnitude is $0$ dB). Phase crossover $\omega_{pc}$ occurs where the loop phase is an odd multiple of $-180^\circ$ under a continuous phase convention. The first asks where the loop has unit magnitude; the second asks where the Nyquist curve lies on the negative real axis.

The two frequencies need not be equal, and there can be **multiple** crossovers of either kind. A controller with resonant peaks may cross $0$ dB several times. In that case a single margin quoted by software can hide important information. Inspect every crossing and consider the whole Nyquist geometry, especially when loop dynamics are nonminimum phase.

## 7. Phase margin

At a gain crossover, the phase margin is the additional phase lag that would move the loop point to $-1$ while holding its magnitude at unity. For the conventional first crossing and unwrapped negative phase,

$$\boxed{\mathrm{PM}=180^\circ+\arg L(j\omega_{gc}).}$$

For example, if the phase at the gain crossover is $-125^\circ$, then the phase margin is $55^\circ$. If the phase has already reached $-190^\circ$, the conventional margin at that crossover is $-10^\circ$. For complicated open-loop unstable or multiple-crossover systems, interpreting this local result requires the Nyquist count.

Larger positive phase margin typically corresponds to better-damped closed-loop behavior, but its relationship to overshoot is only approximate and depends on the rest of the loop shape.

### Derive phase margin from the critical point

At $\omega_{gc}$, the loop lies on the unit circle. If its phase is $-135^\circ$, it is $45^\circ$ short of reaching the critical direction $-180^\circ$. The phase margin is therefore $PM=180^\circ+\arg L(j\omega_{gc})=45^\circ$ under the usual negative-phase convention.

A pure delay $e^{-s\tau}$ contributes $-\omega\tau$ radians without changing magnitude, so it can consume the phase margin approximately by $\omega_{gc}\tau$ if crossover stays fixed. For $PM=45^\circ=\pi/4$ and $\omega_{gc}=10$ rad/s, an additional delay of roughly $0.0785$ s supplies $45^\circ$ of lag. This is an estimate, not a guaranteed delay margin for complicated multiple-crossover systems.

## 8. Gain margin

At a phase crossover, the gain margin is the positive gain factor by which the loop magnitude would have to change to place it at the critical point. The standard *multiplicative* margin is

$$\boxed{\mathrm{GM}=\frac{1}{|L(j\omega_{pc})|},}$$

and in decibels,

$$\boxed{\mathrm{GM}_{\mathrm{dB}}=-20\log_{10}|L(j\omega_{pc})|.}$$

If $|L(j\omega_{pc})|=0.1$, the gain margin is ten, or $20$ dB. An infinite gain margin may mean there is no relevant phase crossover; it does not, by itself, prove that every possible model perturbation is harmless.

### Gain margin is a radial distance expressed as a ratio

At a phase-crossover frequency, $L(j\omega_{pc})$ lies on the negative real axis. If its magnitude is $0.25$, multiplying loop gain by four moves that point from $-0.25$ to $-1$. The gain margin is four, or $20\log_{10}4\approx12.04$ dB. If magnitude is $2$, reducing gain to one-half reaches $-1$; the usual gain-increase margin is then less than one, or $-6.02$ dB.

Gain margin measures an *allowable gain scaling at the crossover*, not the distance between arbitrary Nyquist points. In loops with multiple phase crossings, different scale factors can produce different stability boundaries, so report the relevant increase and decrease margins separately and verify the actual stable gain interval.

## 9. Why robustness is more than one number

Gain margin tests a uniform multiplicative change in loop gain, and phase margin tests additional phase lag at crossover. Real model uncertainty can vary by frequency, change the number of crossovers, or alter the plant's right-half-plane poles or zeros. Therefore, margins are useful *summaries*, not a full robust-stability theorem.

Another useful quantity is the distance from the Nyquist curve to $-1$:

$$|1+L(j\omega)|.$$

Since $S=1/(1+L)$, the maximum sensitivity magnitude is the reciprocal of the smallest distance from the loop curve to $-1$:

$$\boxed{M_s=\sup_{\omega}|S(j\omega)|=\frac{1}{\inf_{\omega}|1+L(j\omega)|}.}$$

The geometric meaning is immediate: if the loop comes dangerously close to $-1$, sensitivity becomes large even if the loop is still mathematically stable.

### Why $M_s$ can reveal trouble that margins miss

Sensitivity is $S(j\omega)=1/[1+L(j\omega)]$. Its magnitude is the reciprocal of the distance from the Nyquist point $L(j\omega)$ to the critical point $-1$. Thus

$$M_s=\sup_\omega|S(j\omega)|=\frac1{\inf_\omega|1+L(j\omega)|}.$$

For a Nyquist trajectory that passes $0.2$ units from $-1$, the corresponding sensitivity peak is at least $5$ (about $14$ dB). Two loops can have similar phase margin but different closest approaches to $-1$ elsewhere. Sensitivity peaking captures one important aspect of robustness, though no single scalar fully replaces uncertainty analysis.

## 10. What the Nichols chart shows

A Nichols chart plots $\arg L(j\omega)$ horizontally and $20\log_{10}|L(j\omega)|$ vertically. Its key point is $( -180^\circ, 0\mathrm{dB})$, the Nichols version of the Nyquist critical point. The horizontal distance to $-180^\circ$ at a 0 dB crossing reflects phase margin; the vertical distance to 0 dB at $-180^\circ$ reflects gain margin.

A constant positive controller gain shifts the Nichols curve vertically. A lead or lag compensator changes both phase and gain in a frequency-dependent manner.

### A Nichols chart connects loop shape to closed-loop behavior

The Nichols chart uses $\arg L(j\omega)$ horizontally and $20\log_{10}|L(j\omega)|$ vertically. Superimposed contours can represent constant values of $|T|$ or $|S|$. As a controller parameter moves the loop's Nichols curve, you can see whether the predicted closed-loop resonance increases or decreases without repeatedly transforming every frequency point back to complex coordinates.

The dangerous neighborhood corresponds to the critical loop point: phase near $-180^\circ$ and magnitude near $0$ dB. Do not read a Nichols chart as an ordinary time response; every point still represents one sinusoidal frequency. The chart is a graphical design aid, not a substitute for confirming closed-loop pole stability.

## 11. Loop shaping: accuracy at low frequencies

For reference tracking and low-frequency output-disturbance rejection, we want

$$S=\frac1{1+L}\approx0\qquad\text{when }|L|\gg1.$$

This is why integral action and large low-frequency loop gain are valuable. In this regime $T\approx1$, so the output tracks the reference. However, more low-frequency gain may decrease phase margin if the crossover moves into a region with significant lag.

### The case for high low-frequency loop gain

If the loop gain is large where reference variations and disturbances are slow, then $S\approx1/L$ is small and $T\approx1$. This helps the output follow slowly changing reference commands and suppresses output disturbances at those frequencies. An integrator often makes $|L|$ rise as frequency approaches zero, improving steady-state tracking of polynomial inputs.

But phase margin matters: a very large low-frequency gain is not helpful if its crossover is pushed into a phase-lagged region that destabilizes the loop. Aim for gain that is high in the *required* low-frequency band and rolls into a well-controlled crossover with adequate phase lead.

## 12. Loop shaping: suppressing measurement noise

When measurement noise enters the sensor in a standard feedback loop, its transfer function to the output is $-T$. At high frequencies we generally want $|T|\ll1$, which is achieved when $|L|\ll1$. High-frequency roll-off helps prevent sensor noise from driving the plant.

The desired loop magnitude therefore often looks like a descending curve: high gain at low frequencies, a unity-gain crossover with useful phase margin, and rapidly decreasing gain above the bandwidth. The exact shape has to respect plant poles, zeros, and delays.

### The case for low high-frequency loop gain

At high frequency, measurement noise and neglected resonances often dominate. If $|L|\ll1$, then $|T|\approx|L|\ll1$, limiting how strongly measurement noise reaches the controlled output. At the same time, the output sensitivity $S\approx1$, so the loop has little ability to reject an output disturbance at those frequencies.

This is not a contradiction: high-frequency output disturbances and high-frequency sensor noise are different channels. The design is a deliberate frequency allocation of feedback authority. Avoid sharp gain peaks and unnecessarily high derivative gain, which can create actuator chatter even if the output looks relatively quiet.

## 13. An illustrative design from a double integrator

A double-integrator loop has $L(s)=K/s^2$. Its magnitude is $K/\omega^2$, which rolls off at $-40$ dB/decade; its phase is $-180^\circ$ everywhere for positive frequencies. At the frequency $\omega=\sqrt K$ it has both unity gain and exactly $-180^\circ$ phase, leaving no phase margin in the idealized undamped loop.

A phase-lead term can create a more favorable crossover angle. For example, add a zero before crossover and a pole above crossover:

$$C_{\mathrm{lead}}(s)=K_c\frac{1+s/z}{1+s/p},\qquad 0<z<p.$$

The zero contributes phase lead over part of the frequency range, while the eventual pole limits high-frequency gain. Choosing crossover and checking the complete Nyquist or Bode response are required; inserting a zero alone is not a guarantee of stability.

### Double integrator design illustrates the challenge

For a position-controlled mass with $G(s)=1/(ms^2)$ and positive proportional controller $K$, the closed-loop characteristic polynomial is $ms^2+K$. Its poles are purely imaginary, so pure proportional feedback does not provide asymptotic damping. Add a velocity-proportional term $C(s)=K_p+K_ds$ and the characteristic polynomial becomes $ms^2+K_ds+K_p$.

Matching to $s^2+2\zeta\omega_ns+\omega_n^2$ gives $K_p=m\omega_n^2$ and $K_d=2m\zeta\omega_n$. This provides a direct, physically interpretable design: position feedback supplies an effective stiffness; velocity feedback supplies damping. In noisy applications, derivative action must be filtered or velocity measured appropriately.

## 14. Rules of thumb and their limitations

The handwritten notes list useful heuristics: a gain-crossover slope near $-20$ dB/decade is often easier to stabilize than a much steeper one, response speed is tied to bandwidth, and excessive bandwidth is limited by unmodeled modes and noise. Such rules are guidance, not universal inequalities. Always confirm the actual closed-loop stability, step response, disturbance rejection, and sensor-noise amplification after designing the controller.

### Rules of thumb are design starting points

A phase margin around $45$–$60^\circ$ is often a useful initial target for simple minimum-phase loops, but a particular margin does not uniquely determine overshoot. Zeros, higher-order poles, delay, and resonance can change the actual time response. Similarly, a gain margin quoted in decibels does not indicate the entire robustness to dynamic plant uncertainty.

Treat every numerical target as a *hypothesis to verify*. After designing the open loop, check Nyquist stability, the closed-loop poles, peak sensitivity, reference and disturbance transients, measurement noise, control effort, and reasonable plant-parameter variations. Good control engineering uses several consistent checks rather than relying on one attractive Bode plot.


## Practice problems and worked solutions

### Problem 1 — Phase margin

At the only gain crossover, a nominal stable loop has phase $-142^\circ$. What is its phase margin?

**Worked solution.** $PM=180^\circ-142^\circ=38^\circ$, under the usual simple negative-feedback convention. Inspect the full Nyquist curve if there are additional crossovers or unstable open-loop poles.

### Problem 2 — Gain margin

At the only phase crossover, the loop magnitude is $0.2$. What gain increase reaches the critical point?

**Worked solution.** The critical factor is $1/0.2=5$, or $20\log_{10}5\approx14.0$ dB. The interpretation as a stable increase limit requires appropriate nominal stability and crossover assumptions.

### Problem 3 — Sensitivity geometry

A Nyquist locus passes a minimum distance $0.4$ from $-1$. What is $M_s$?

**Worked solution.** $M_s=1/0.4=2.5$, corresponding to $20\log_{10}2.5\approx7.96$ dB. This is a peak amplification of sensitivity, not a bandwidth measurement.



## Exam mastery — Use Nyquist correctly when the easy rules fail

### The argument principle in control language

The closed-loop poles are zeros of $1+L(s)$. Let $P$ count right-half-plane poles of $L$ and $Z$ count right-half-plane zeros of $1+L$. On a Nyquist contour enclosing the right half-plane in the standard direction, the signed winding count around $-1$ relates to these numbers. With **clockwise encirclements counted positive**, use

$$\boxed{N_{\rm CW}=Z-P\quad\Longleftrightarrow\quad Z=P+N_{\rm CW}.}$$

For a stable closed loop we demand $Z=0$, so a loop with $P=2$ RHP poles needs two **counterclockwise** encirclements ($N_{\rm CW}=-2$). If $P=0$, any nonzero signed winding would make $Z>0$ if clockwise; the winding convention matters, and one must inspect the complete contour, not just a positive-frequency half plot.

### Gain margins with multiple phase crossings

The familiar scalar $GM=1/|L(j\omega_\pi)|$ is straightforward only when the relevant $-180^\circ$ phase crossing is unambiguous. If a loop phase moves above and below $-180^\circ$ multiple times, gain scaling may create **separate stable gain intervals**. At every candidate crossing, determine whether scaling brings the Nyquist trajectory through $-1$, and use the full winding count to decide which side is stable. A 60° phase margin at one gain crossover can coexist with instability caused elsewhere.

### Why sensitivity circles measure robustness

Since $S=1/(1+L)$, a Nyquist point distance $d=|1+L(j\omega)|$ from $-1$ produces $|S|=1/d$. The maximum sensitivity $M_s=\max_\omega|S|$ is therefore the reciprocal of the closest Nyquist approach to $-1$. A loop skimming the critical point produces large peaking, sensitivity to model error, and poor disturbance rejection at some frequencies even if no encirclement is present. Use this geometric test in the final exam's Nyquist and Nichols reasoning.



---

<!-- Exam-ready derivation lab — HTML supplement; editable, preserved exactly as on the web page. -->

<section class="mastery-lab" id="deep-derivation"><p class="lab-kicker">Count unstable poles before sketching</p><h2>Derivation lab: verify Nyquist stability with a characteristic polynomial</h2>
<p>The final exam includes <span class="math">\(P(s)=\tfrac15(s-1)^2/[s(s+1)^2]\)</span> with <span class="math">\(C(s)=k\)</span>. For unity negative feedback, closed-loop poles are zeros of <span class="math">\(1+kP(s)\)</span>, so multiplying through gives</p>
<div class="math-block">\[5s(s+1)^2+k(s-1)^2=5s^3+(10+k)s^2+(5-2k)s+k.\]</div>
<p>With a cubic <span class="math">\(a_3s^3+a_2s^2+a_1s+a_0\)</span>, the Routh condition for all roots in the open left half plane is positive coefficients and <span class="math">\(a_2a_1&gt;a_3a_0\)</span>. Substitution gives</p>
<div class="math-block">\[k&gt;0,\quad5-2k&gt;0,\quad(10+k)(5-2k)&gt;5k\iff k^2+10k-25&lt;0.\]</div>
<p>Thus <span class="math">\(\boxed{0&lt;k&lt;5(\sqrt2-1)\approx2.071}\)</span> gives strict closed-loop stability. The open-loop pole at <span class="math">\(s=0\)</span> requires a Nyquist contour indentation; the right-half-plane zeros at <span class="math">\(s=+1\)</span> do <strong>not</strong> count as open-loop RHP poles in Nyquist’s <span class="math">\(P\)</span> count.</p>
<details class="quick-check"><summary>What happens at the endpoint \(k=0\)?</summary><p>The closed loop retains a pole at the origin, so it is not asymptotically stable. Strict stability uses <span class="math">\(0&lt;k\)</span>, not <span class="math">\(0\le k\)</span>.</p></details><p class="exam-link">Work the full contour/phase interpretation in <a href="final.html">Final Problem 2</a>.</p></section>
