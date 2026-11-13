# Supplement: Positive and negative gain margins

Gain margin is often introduced as a single positive number. The handwritten supplement points out an important qualification: a loop with several crossings of the negative real axis may have **more than one gain boundary**, and some boundaries correspond to *increasing* the loop gain while others correspond to *decreasing* it. Nyquist geometry is the safest way to interpret them.

## 1. Gain changes scale the Nyquist curve

Consider a nominal loop transfer function $L_0(s)$ multiplied by a positive scalar $k$:

$$L_k(s)=kL_0(s),\qquad k>0.$$

Multiplication by $k$ does not rotate the points of the Nyquist curve; it moves each point along the same ray from the origin. The stability boundary is crossed when, at some frequency,

$$kL_0(j\omega)=-1.$$

Therefore the loop must be on the negative real axis at that frequency, with phase $-180^\circ$ modulo $360^\circ$, and the critical gain factor is

$$\boxed{k_{crit}=\frac1{|L_0(j\omega_{pc})|}.}$$

The sign and size of the decibel margin reveal which direction of gain change reaches that crossing.

### A gain change moves every Nyquist point radially

Let the nominal loop be $L_0(s)$ and let the uncertain positive scalar gain be $k$. Then $L(s)=kL_0(s)$. At each frequency, magnitude changes to $k|L_0(j\omega)|$ and phase is unchanged. On the Nyquist plane the entire locus expands away from the origin for $k>1$ or contracts toward the origin for $0<k<1$.

Closed-loop stability changes at a gain boundary when the scaled locus crosses the critical point $-1$. This occurs only at frequencies where the nominal locus lies on the negative real axis. Hence phase-crossing points identify candidate gain boundaries, and the gains needed to move those points to $-1$ follow from their magnitudes.

## 2. Positive gain margin: an increase reaches instability

Suppose the nominal Nyquist curve crosses the negative real axis at $L_0(j\omega_{pc})=-0.4$. The crossing is between the origin and $-1$. We must increase gain by

$$k_{crit}=\frac1{0.4}=2.5,$$

or

$$\mathrm{GM}_{dB}=20\log_{10}(2.5)\approx7.96\ \mathrm{dB},$$

to move that crossing to the critical point. This is a **positive gain margin**, provided that the crossing is indeed a stability boundary for the particular closed-loop system. Physically, sufficiently increasing loop gain would make the corresponding encirclement condition change.

### Calculate the gain increase explicitly

If a phase-crossing point is $L_0(j\omega_p)=-0.4$, then multiplying by $k=2.5$ places it at $-1$. The associated gain-increase margin is $GM_+=2.5$ or $20\log_{10}(2.5)\approx7.96$ dB. The nominal loop must still be stable for this to represent a useful allowable increase.

At the critical gain the closed-loop characteristic equation has a root on the imaginary axis (subject to the usual regularity assumptions). This is a **boundary of stability**, not an acceptable robust operating point. In practice, preserve a buffer rather than designing exactly at the computed margin.

## 3. Negative gain margin: a decrease reaches instability

Now suppose a relevant negative-real-axis crossing is at $L_0(j\omega_{pc})=-2$. Its magnitude is greater than one. To place it at $-1$, we must **reduce** the gain by a factor of two:

$$k_{crit}=\frac12=0.5,\qquad\mathrm{GM}_{dB}=20\log_{10}(0.5)\approx-6.02\ \mathrm{dB}.$$

A negative decibel gain margin in this sense says that a gain **decrease** can reach the stability boundary. It should not automatically be interpreted as “the present closed loop is unstable”; determining present stability requires the Nyquist criterion with the correct open-loop pole count.

### A gain decrease can also destabilize a loop

If the nominal Nyquist locus has an appropriate phase-crossing point at $L_0=-2.5$, reducing gain to $k=0.4$ moves it to $-1$. In a system whose stable gain interval has a lower boundary, this can be a **negative gain margin**: the amount of allowable gain reduction before losing stability.

This seems counterintuitive if you have only studied stable open-loop plants with simple negative feedback, where reducing gain often appears safe. For plants with unstable open-loop poles or more complex dynamics, feedback may need a minimum amount of gain to stabilize the system. Whether a particular crossing is the actual boundary of the stable interval depends on the full Nyquist winding and open-loop pole count.

## 4. Multiple phase crossovers give multiple gain margins

A loop with complex dynamics can cross the negative real axis at several different frequencies $\omega_{pc,1},\omega_{pc,2},\ldots$. For each crossing,

$$k_i=\frac1{|L_0(j\omega_{pc,i})|},\qquad g_i=20\log_{10}k_i.$$

These are **candidate gain-stability boundaries**. Some $g_i$ may be positive and others negative. The full interval of gains for which the closed-loop system is stable can be bounded both above and below; which intervals are stable must be established by Nyquist encirclement counts or an equivalent characteristic-root analysis.

For example, one negative-axis intersection may lie to the left of $-1$ and another to its right. As $k$ changes, the intersections pass through $-1$ at different gain values, potentially changing the number of unstable closed-loop poles more than once.

### Multiple phase crossings produce multiple candidate boundaries

Imagine the nominal locus crossing the negative real axis at $-0.2$, $-0.8$, and $-1.7$. The corresponding candidate gain multipliers are $5$, $1.25$, and about $0.588$. As $k$ changes, the Nyquist winding around $-1$ can change at one or more of these values. You must determine the stability *intervals* between candidate boundaries; simply taking the smallest absolute dB figure can be misleading.

A systematic method is to calculate all $k_i=1/|L_0(j\omega_{pi})|$, order them on the positive gain axis, and test the Nyquist count or closed-loop poles at representative gains between the boundaries. This gives a real stability map instead of one ambiguous margin number.

## 5. Reading the same phenomenon from a Nichols chart

A Nichols chart places phase on the horizontal axis and gain in decibels on the vertical axis. At a phase crossover, the relevant phase is $-180^\circ$ modulo $360^\circ$. A positive vertical displacement needed to reach the critical point corresponds to increasing gain; a negative displacement corresponds to decreasing it.

The critical Nichols point is $(-180^\circ,0\,\mathrm{dB})$. Multiple intersections of the curve with the vertical line at $-180^\circ$ can produce distinct margins. The Bode magnitude and phase curves contain the same information, but the Nyquist trajectory exposes the direction and topology of the stability change most directly.

### Use Nichols coordinates to read multiplicative gain shifts

Because a positive scalar gain $k$ adds $20\log_{10}k$ to the Bode or Nichols magnitude, a gain uncertainty shifts a Nichols curve vertically without changing its phase coordinates. A $+6$ dB gain increase is almost a factor of two; a $-6$ dB change is almost a factor of one-half.

The critical point in Nichols coordinates is phase $-180^\circ$ and gain $0$ dB, with phase wrapping handled consistently. If a curve crosses $-180^\circ$ at $-8$ dB, an $8$ dB upward shift brings that crossing to the boundary. If it crosses at $+8$ dB, an $8$ dB downward shift reaches it. Multiple crossings must still be examined together.

## 6. Phase-margin signs and the distinction from gain margin

Phase margin measures additional phase lag required to reach the critical point **at a unity-gain crossover**:

$$\mathrm{PM}=180^\circ+\arg L_0(j\omega_{gc})$$

under a conventional unwrapped-phase choice. Positive and negative phase margins refer to angular distance, while positive and negative gain margins in this supplement refer to the direction of gain variation. Because multiple crossovers complicate both, the overall stable-gain interval should be checked using the full Nyquist criterion.

### Do not conflate phase margin and gain margin

Gain margin varies the loop **magnitude** while holding nominal phase fixed. Phase margin asks how much additional phase lag at a unit-magnitude crossing would bring the loop to the critical direction. A pure time delay changes phase by $-\omega\tau$ while leaving magnitude unchanged, so gain margin alone does not bound permissible delay.

Similarly, a frequency-dependent uncertainty is not a single gain multiplier. A loop with comfortable scalar gain margins can be fragile to high-frequency phase lag or a narrow resonance. Use gain and phase margins together with peak sensitivity and realistic uncertainty models for a stronger robustness assessment.

## 7. Practical interpretation

When a stability-margin routine reports several gain margins, do not discard the negative one. Ask which nominal gain changes are safe, which direction will encounter instability first, whether the open loop has unstable poles, and whether the relevant crossing actually changes the Nyquist encirclement count. A useful report states the positive and negative gain boundaries explicitly rather than compressing them into one unsigned number.

### A dependable margin-reporting checklist

Before reporting a gain margin, verify nominal closed-loop stability, count right-half-plane open-loop poles, mark all phase crossings, calculate each positive gain multiplier, and identify the stable intervals. Quote both multiplicative factors and dB values, stating whether a change is an allowable increase or decrease. For a finite interval $k\in(k_{min},k_{max})$ containing nominal $k=1$, the two useful margins are the distance to each endpoint.

If a phase crossing is tangent to the negative real axis rather than transverse, the local interpretation can be subtle; a crossing of the critical point does not always imply the same stability change as a generic crossing. Confirm ambiguous cases with a characteristic-root calculation.


## Practice problems and worked solutions

### Problem 1 — Positive margin

At the relevant phase crossing, $L_0=-0.1$. Find the critical gain multiplier and its dB value.

**Worked solution.** $k=1/0.1=10$, corresponding to $+20$ dB of gain increase.

### Problem 2 — Negative margin

At a relevant crossing, $L_0=-4$. Find the gain reduction that moves that point to $-1$.

**Worked solution.** $k=1/4=0.25$, or $-12.04$ dB relative to nominal gain. Whether this is the lower stability limit requires checking the full Nyquist winding.

### Problem 3 — Multiple boundaries

If candidate critical gain factors are $0.4$, $1.5$, and $3$, is the nominal gain definitely stable?

**Worked solution.** No. The list gives possible boundaries, not the stability of the intervals. Count right-half-plane closed-loop poles at one representative gain in each interval, including nominal $k=1$.



## Exam mastery — Positive and negative stability margins

### Gain scaling and logarithmic units

A scalar positive gain $K$ moves every Nyquist point radially by $K$ and shifts Nichols magnitude vertically by $20\log_{10}K$ dB while leaving phase unchanged. If a phase-crossing has current magnitude $a=|L(j\omega_\pi)|$, that specific critical gain factor is $K_*=1/a$. Its dB value is $-20\log_{10}a$. **Positive/negative gain margins** refer to allowable scaling upward or downward before instability; they are not simply the sign of the controller coefficient.

### Solve multiple crossings by intervals

List all frequencies where phase $\equiv-180^\circ\pmod{360^\circ}$ and the corresponding candidate factors $K_i=1/|L(j\omega_i)|$. Sort them with $0$ and $\infty$. Then choose a test gain in each interval, form the characteristic polynomial or full Nyquist winding, and mark the intervals that are stable. This extra step is essential when loops have multiple gain crossovers or open-loop unstable poles.

### Nichols margin targets

At phase $-180^\circ$, a crossing at $-8$ dB means an $+8$ dB gain increase reaches the critical point. A crossing at $+8$ dB means an $-8$ dB reduction reaches it. At 0 dB, 60° phase margin means the curve must be at least 60° from the critical phase along the appropriate branch. The final-exam extra credit requires considering **both directions**, not only the usual gain-increase margin.



---

<!-- Exam-ready derivation lab — HTML supplement; editable, preserved exactly as on the web page. -->

<section class="mastery-lab" id="deep-derivation"><p class="lab-kicker">Robustness is an interval, not one number</p><h2>Derivation lab: distinguish gain increases from gain decreases</h2>
<p>Consider a nominal loop <span class="math">\(L_0\)</span> scaled by a positive factor <span class="math">\(k\)</span>. At every negative-real-axis crossing of <span class="math">\(L_0(j\omega)\)</span>, a critical gain is <span class="math">\(k_c=1/|L_0(j\omega)|\)</span>. Separate gains <em>above</em> and <em>below</em> the nominal value <span class="math">\(k=1\)</span>. A positive gain margin describes tolerated gain increase; a negative-gain margin describes tolerated reduction, usually stated as a lower threshold or negative dB value.</p>
<p>Do not infer stability from the nearest crossing alone when there are multiple phase crossings or open-loop unstable poles. Scale the full Nyquist curve, count the encirclements, and identify a continuous stable <em>interval</em> of gain. For the final-exam plant analyzed in Lecture 7, the closed-loop stable gain range is <span class="math">\(0&lt;k&lt;2.071\)</span>. The nominal <span class="math">\(k=1\)</span> therefore tolerates up to a factor of roughly 2.071 increase; reduction toward zero eventually encounters marginal stability.</p>
<details class="quick-check"><summary>Why can two different gain margins exist?</summary><p>One stability boundary may occur when gain grows, while a distinct boundary can occur when gain shrinks. Multiple Nyquist crossings can create still more candidate boundaries; check the whole contour to select the actual stable gain intervals.</p></details><p class="exam-link">Use this reasoning for <a href="final.html">Final extra credit</a> and <a href="homework-06.html">Homework 6</a>.</p></section>
