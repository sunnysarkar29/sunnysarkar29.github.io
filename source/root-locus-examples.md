# Supplement: Worked root-locus examples

These supplemental notes give the hand-sketching rules and apply them to examples with real and complex poles. The key idea is to derive root-locus geometry from the characteristic equation and the complex angle condition, rather than drawing arbitrary curves between poles and zeros.

## 1. Starting from the characteristic equation

Assume unity negative feedback with a positive variable gain $K$ and fixed loop shape $L_0(s)$:

$$L(s)=K L_0(s),\qquad 1+K L_0(s)=0.$$

Writing $L_0=N/D$, the characteristic equation is $D(s)+KN(s)=0$. The root-locus plot displays the zeros of this polynomial as $K$ increases from zero to infinity. All branches therefore start at open-loop poles, and finite branches end at open-loop zeros.

### Rewrite the characteristic equation correctly

A positive-gain root-locus problem begins with $1+KG_0(s)=0$. Write $G_0(s)=N(s)/D(s)$, then form $D(s)+KN(s)=0$. The roots of this *gain-dependent* polynomial are the closed-loop poles. If $K=0$, they start at roots of $D$; for large $K$, some approach roots of $N$ and others go to infinity.

For $G_0(s)=1/[(s+1)(s+4)]$, the characteristic equation is $(s+1)(s+4)+K=0$, or $s^2+5s+4+K=0$. Never use the poles of $KG_0$ as though they were already the closed-loop roots; the entire point is that the feedback denominator changes with $K$.

## 2. The five principal rules

For a simple root-locus sketch with $n$ open-loop poles and $m$ finite zeros:

1. **Count branches.** There are $n$ branches, equal to the total open-loop pole multiplicity.
2. **Find starting and ending locations.** Branches begin at the open-loop poles as $K\to0$ and terminate at open-loop zeros or infinity as $K\to\infty$.
3. **Mark real-axis segments.** A real point belongs to the positive-gain root locus if the number of real poles and zeros to its right is odd.
4. **Calculate infinite-branch asymptotes.** There are $n-m$ asymptotes with centroid and angles given below.
5. **Apply symmetry.** Real-coefficient systems have loci symmetric about the real axis.

These rules are an efficient starting point; further rules can determine branch departure angles, breakaway points, imaginary-axis crossings, and precise gain values.

### Sketch with a consistent sequence of rules

First mark open-loop poles with crosses and zeros with circles. Next count branches, mark real-axis segments with the odd-number-to-the-right test, calculate asymptote angles and centroid, and look for breakaway or break-in points. For complex poles or zeros, calculate departure and arrival angles. Last, find any imaginary-axis crossings and check sample gains.

Each rule is a consequence of the condition that the open-loop angle at a locus point must be an odd multiple of $180^\circ$. The rules are aids, not independent physical laws. When two rules seem to contradict each other, return to $D(s)+KN(s)=0$ and the angle/magnitude conditions to find the mistake.

## 3. Asymptote centroid and angles

When $n>m$, the asymptote centroid is

$$\boxed{\sigma_a=\frac{\sum_i p_i-\sum_j z_j}{n-m}.}$$

The angles are

$$\boxed{\theta_q=\frac{(2q+1)180^\circ}{n-m},\qquad q=0,1,\ldots,n-m-1.}$$

The centroid is a complex-number calculation that is real for real-coefficient systems, since nonreal poles and zeros come in conjugate pairs. It locates the intersection of the infinite-branch asymptotes, not the point where every branch must meet.

### The centroid is a weighted algebraic quantity

If there are $n$ poles and $m$ finite zeros with $n>m$, the asymptotes intersect the real axis at $\sigma_a=(\sum p_i-\sum z_i)/(n-m)$. For poles at $0,-2,-6$ and no finite zeros, $\sigma_a=(-8)/3\approx-2.667$, and there are three asymptotes at $60^\circ$, $180^\circ$, and $300^\circ$.

Add a finite zero at $-4$ and there are only two asymptotes: their centroid becomes $[(-8)-(-4)]/2=-2$, with directions $90^\circ$ and $270^\circ$. This illustrates how a compensator zero can drastically change the root-locus geometry.

## 4. Example: one real pole and a conjugate pair

The handwritten worked example labeled Example 3 uses the poles

$$p_1=-3,\qquad p_2=-1+3j,\qquad p_3=-1-3j,$$

and no finite zeros. There are $n=3$ poles and $m=0$ zeros, so there are three root-locus branches, each extending to infinity for sufficiently large $K$.

The centroid is

$$\sigma_a=\frac{-3+(-1+3j)+(-1-3j)}3=\boxed{-\frac53}.$$

The angles are

$$\theta_0=60^\circ,\qquad \theta_1=180^\circ,\qquad \theta_2=300^\circ\ (= -60^\circ).$$

Thus one asymptote follows the negative real direction and two leave the centroid at $\pm60^\circ$. The nonreal branches appear as mirror images above and below the real axis.

### Complex poles need an angle budget

At a proposed locus point $s_0$, form vectors from every open-loop zero to $s_0$ and from every open-loop pole to $s_0$. Sum the zero angles and subtract the pole angles. The point is on a positive-gain locus only when the net angle is $180^\circ$ modulo $360^\circ$.

For a complex-conjugate pole pair, the branches typically depart at angles not visible from the simple real-axis rule. To find the departure angle from one pole, sum contributions from all the *other* poles and zeros, then solve for the missing vector angle required by the angle condition. This “angle budget” technique is more reliable than memorizing special-case sketches.

## 5. The real-axis segment in Example 3

Only the real pole at $-3$ lies on the real axis. For any real test point $s<-3$, one real pole is to its right, so the angle parity is odd and the locus includes the interval $(-\infty,-3)$. For $s>-3$, no real poles or zeros lie to its right, so the parity is even and this interval is not on the positive-gain root locus.

The branch leaving $-3$ travels left on the real axis and asymptotically follows the $180^\circ$ ray. The other two branches leave the complex-conjugate poles, curve as required by the angle condition, and approach the $+60^\circ$ and $-60^\circ$ asymptotes.

### Real-axis segments are local geometric tests

For a test point on the real axis, count the number of **real** poles and zeros to the right. An odd count places that point on the conventional positive-gain locus. For poles at $-1,-3,-5$, the intervals $(-\infty,-5)$ and $(-3,-1)$ are on the locus, while $(-5,-3)$ and $(-1,\infty)$ are not.

This rule determines where branches *can* travel along the real axis, not the exact gain at each position. The magnitude condition supplies the gain, and potential breakaway or break-in points must still be found. Be particularly careful with repeated poles and zeros, since multiplicity contributes to angle counting.

## 6. Checking a point with the angle condition

For a rational loop

$$L_0(s)=\frac{N(s)}{(s+3)\big[(s+1)^2+9\big]},$$

with constant $N$ and positive $K$, a candidate location $s_*$ is on the root locus only if

$$-\arg(s_*+3)-\arg(s_*+1-3j)-\arg(s_*+1+3j)=(2k+1)180^\circ.$$

The equation must be satisfied modulo $360^\circ$. Once it is, the corresponding gain is $K=1/|L_0(s_*)|$. The angle condition is often the most dependable way to verify a hand-drawn departure direction.

### Verify a candidate pole numerically

Consider $G_0(s)=1/[s(s+2)]$ and proposed point $s=-1+j2$. Its pole vectors are $-1+j2$ and $1+j2$, whose arguments add to $180^\circ$. It satisfies the angle condition. The gain from $K=|s(s+2)|$ is $|-1+j2|\,|1+j2|=(\sqrt5)^2=5$.

Check algebraically: the characteristic polynomial is $s^2+2s+K$. At $K=5$, its roots are $-1\pm j2$. The agreement is an excellent practice check. For a more complicated plant, use the same three stages: angle, gain, and substitution into the characteristic equation.

## 7. A fourth pole or a finite zero changes the asymptotes

In other examples, the notes add real poles or zeros and recompute the centroid and the number of asymptotes. For a generic fourth-order loop with four poles $p_1,p_2,p_3,p_4$ and one zero $z_1$, there are four branches but only three infinite asymptotes:

$$\sigma_a=\frac{p_1+p_2+p_3+p_4-z_1}{3},\qquad\theta_q\in\{60^\circ,180^\circ,300^\circ\}.$$

The zero attracts one finite branch; the other three head to infinity. This is an important distinction: **the number of branches is the number of open-loop poles, not the number of asymptotes**.

### Distinguish finite zeros from branches at infinity

A root locus has as many branches as open-loop poles. If a fourth pole is added without a zero, one more branch must be accounted for and the asymptote set changes. If instead a finite zero is added, a branch terminates there, reducing the number that travel to infinity.

This explains a compensator-design trick: introducing a well-placed zero attracts a branch toward the zero and changes the trajectory of nearby closed-loop poles. But a zero may also change the reference-to-output numerator, affecting overshoot independently of its pole effect. Always verify the full response after using pole-zero geometry to motivate a design.

## 8. Departure and arrival angles

For a simple nonreal pole $p_k$ of $L_0$, the root-locus departure angle is determined by satisfying the odd-multiple-of-$180^\circ$ criterion near $p_k$. A useful computational form is

$$\theta_{dep}=180^\circ+\sum_j\arg(p_k-z_j)-\sum_{i\ne k}\arg(p_k-p_i)\pmod{360^\circ}.$$

For a nonreal zero $z_k$, the arrival angle can similarly be computed from the remaining poles and zeros. Use these angles when a sketch's complex branches are ambiguous; do not simply connect a pole to the visually nearest zero.

### Departure and arrival angles from first principles

Near a complex pole $p_k$, one pole-vector angle is unknown because the observation point is approaching $p_k$ from the departure direction. Apply the angle condition to get

$$\theta_{dep}=180^\circ+\sum_i\arg(p_k-z_i)-\sum_{j\ne k}\arg(p_k-p_j)\pmod{360^\circ}.$$

At a complex zero, solve an analogous equation for the arrival angle, taking care with the sign of the zero contribution. Use $\operatorname{atan2}$ for each vector to avoid quadrant mistakes. A quick sketch of the vectors often prevents the biggest errors before any arithmetic begins.

## 9. Breakaway and break-in points

At a real point on the root locus, solve the characteristic equation for the gain:

$$K(s)=-\frac{D(s)}{N(s)}.$$

Candidate real breakaway or break-in points satisfy

$$\boxed{\frac{dK(s)}{ds}=0.}$$

Not every mathematical root of this equation is a valid breakaway point. Check that the point lies on a positive-gain root-locus segment and that the associated gain is nonnegative.

### Breakaway points require a gain derivative

Along a real-axis locus, solve the characteristic equation for gain: $K(s)=-D(s)/N(s)$. A breakaway or break-in candidate often satisfies $dK/ds=0$. For $G_0=1/[s(s+3)]$, $K(s)=-s(s+3)$, so $dK/ds=-(2s+3)=0$ gives $s=-1.5$.

Then check that the point lies on an actual positive-gain real-axis locus segment and that $K(-1.5)=2.25>0$. Roots of $dK/ds=0$ elsewhere are **candidates**, not automatically valid breakaway points. For repeated roots and special cases, analyze the characteristic polynomial and local geometry more carefully.

## 10. Root locus is an approximation and verification tool

Root-locus geometry is most informative when one scalar gain is varied and the rest of the loop structure is fixed. It gives fast intuition about where closed-loop poles may lie, but a complete design should still examine sensitivity, phase and gain margins, disturbance response, noise, and actuator demands. A numerical root-locus plot is a useful verification step, not a replacement for understanding the angle condition and the underlying characteristic polynomial.

### Root locus is best paired with other checks

The root-locus sketch tells how closed-loop poles move as gain changes, but not by itself the entire reference numerator, saturation behavior, or noise sensitivity. For a candidate gain, compute the exact closed-loop transfer function, then check settling time, overshoot, disturbance rejection, phase margin, and actuator effort.

A useful exercise is to choose a gain that places the dominant poles inside an acceptable damping-and-settling region, then evaluate the Bode and Nyquist plots of the resulting loop. This connects the geometric, time-domain, and frequency-domain viewpoints—the central skill of a control-systems course.


## Practice problems and worked solutions

### Problem 1 — Asymptotes

For open-loop poles $0,-2,-4$ and no zeros, find the centroid and asymptote directions.

**Worked solution.** The centroid is $(-6)/3=-2$ and the directions are $60^\circ$, $180^\circ$, and $300^\circ$.

### Problem 2 — Check a proposed pole

For $G_0=1/[s(s+2)]$, show that $s=-1+j3$ is on the positive-gain locus and find $K$.

**Worked solution.** The two pole-vector angles sum to $180^\circ$, satisfying the angle condition. The gain is $K=|s(s+2)|=|-1+j3|\,|1+j3|=10$.

### Problem 3 — Why derivative tests are not enough

A solution of $dK/ds=0$ lies on a real interval that is not a positive-gain locus segment. Is it a valid breakaway point?

**Worked solution.** No. It is only a stationary-gain candidate. It must also satisfy the real-axis locus rule and $K>0$, and a characteristic-root check can resolve special cases.



## Exam mastery — Root-locus calculations you can reproduce by hand

### A complete reproducible example

Consider $G_0(s)=(s-2)/(s^2+10s+100)$. With negative feedback, $1+KG_0=0$ implies $s^2+(10+K)s+(100-2K)=0$. For $K=0$, the branches start at $-5\pm j\sqrt{75}$. With $K=50$, the constant term becomes zero, so one branch crosses the origin. For larger gains, the product of roots becomes negative; one root is positive and the closed loop is unstable. Thus its exact stable range for $K\ge0$ is $0\le K<50$.

The finite RHP zero at $+2$ explains the eventual RHP branch behavior. A root-locus drawing must respect the number of branches and asymptotes, but the final stability statement should be checked from $D+KN$ rather than based on visual proximity to the imaginary axis.

### Exact breakaway calculation

Since $K(s)=-D(s)/N(s)$ along a root locus, a real-axis breakaway or break-in candidate satisfies $dK/ds=0$. For a rational plant this is equivalent to $D'(s)N(s)-D(s)N'(s)=0$, except at poles/zeros and singular points. Solve the polynomial, then **reject** candidates that fail the real-axis locus rule or yield a negative $K$ for a negative-feedback plot. This prevents spurious breakaway points from being reported.

### Distinguish pole maps from step responses

A root locus predicts closed-loop poles as gain varies. It does not show numerator zeros, input disturbance pathways, sensor noise, actuator limits, or nonlinear saturation. After placing poles, calculate the full $T(s)$ and step response, and check the design in both the time and frequency domains.



---

<!-- Exam-ready derivation lab — HTML supplement; editable, preserved exactly as on the web page. -->

<section class="mastery-lab" id="deep-derivation"><p class="lab-kicker">From algebra to geometric sketch</p><h2>Derivation lab: compute an exact breakaway point</h2>
<p>Use <span class="math">\(L(s)=K/[(s+1)(s+4)]\)</span> with negative unity feedback. Closed-loop poles satisfy</p>
<div class="math-block">\[(s+1)(s+4)+K=0\iff s^2+5s+(4+K)=0.\]</div>
<p>The roots are <span class="math">\(s=(-5\pm\sqrt{9-4K})/2\)</span>. They begin at <span class="math">\(-1\)</span> and <span class="math">\(-4\)</span>, meet when <span class="math">\(9-4K=0\)</span>, and leave the real axis at</p>
<div class="math-block">\[\boxed{K_b=\frac94,\qquad s_b=-\frac52}.\]</div>
<p>Alternatively solve <span class="math">\(K(s)=-(s+1)(s+4)\)</span> and set <span class="math">\(dK/ds=-2s-5=0\)</span>. But a stationary point is only a <em>candidate</em>: it must lie on the relevant real-axis locus and have an allowed gain. Two poles and no finite zeros produce two asymptotes, with centroid <span class="math">\((-1-4)/2=-2.5\)</span> and angles <span class="math">\(\pm90^\circ\)</span>.</p>
<details class="quick-check"><summary>Does this closed loop lose stability for very large positive K?</summary><p>No: the complex poles remain at real part <span class="math">\(-2.5\)</span> while their imaginary magnitude grows. A stable root locus can still give undesirable overshoot or high control effort.</p></details><p class="exam-link">Compare the more complex plants in <a href="homework-08.html">Homework 8, Problem 2</a>.</p></section>
