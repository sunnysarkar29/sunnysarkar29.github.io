
# Final exam — Fully worked study solutions

**Source:** AE511_Final_Exam.pdf (14 pages; four required problems and one extra-credit problem). The final specifies methods covered in class; this guide uses classical transfer functions, Bode/Nyquist/Nichols arguments, algebra, and worked frequency calculations, not black-box auto-tuning. Numerical fits to plotted data are labeled as estimates.

## Problem 1 — Identify a transfer function from a noisy step response

The supplied graph shows a **4-unit step** applied at $t_0=1.2$ s, output steady near $2$, a first peak near $2.75$–$2.8$ around $t=3.0$–$3.2$ s, and decaying oscillations. The steady-state theorem gives the static gain

$$\boxed{K=\frac{y_\infty}{\Delta u}\approx\frac24=0.5.}$$

Estimate peak overshoot $M_p\approx(2.8-2.0)/2.0=0.40$. For a standard underdamped second-order system,

$$M_p=\exp\!\left(-\frac{\pi\zeta}{\sqrt{1-\zeta^2}}\right)\Rightarrow\zeta=\frac{-\ln M_p}{\sqrt{\pi^2+(\ln M_p)^2}}\approx0.28.$$

The peak occurs about $t_p\approx3.1-1.2=1.9$ s **after the input step**, so the damped natural frequency is $\omega_d\approx\pi/t_p\approx1.65$ rad/s, and

$$\omega_n=\frac{\omega_d}{\sqrt{1-\zeta^2}}\approx1.72\ \mathrm{rad/s}.$$

An estimated strictly proper **zero-free second-order** transfer function is then

$$\boxed{G_{\rm est}(s)\approx\frac{K\omega_n^2}{s^2+2\zeta\omega_ns+\omega_n^2}\approx\frac{1.48}{s^2+0.96s+2.96}.}$$

1. This $G$ predicts a delayed-by-input-step oscillatory response with final gain 0.5.
2. **Zeros:** none finite in this assumed model. A graph alone cannot prove that the true physical system has no additional hidden or cancelling zeros.
3. **Poles:** $-\zeta\omega_n\pm j\omega_d\approx-0.48\pm j1.65$.
4. **Stability:** both poles lie strictly in the LHP, so the estimated rational LTI transfer function is BIBO stable. The damped decaying oscillation is consistent with this.
5. **Properness:** numerator degree 0, denominator degree 2; it is **strictly proper**.
6. **Bode:** the magnitude begins at $20\log_{10}0.5\approx-6.02$ dB, has a modest resonant bump near $\omega_r=\omega_n\sqrt{1-2\zeta^2}\approx1.58$ rad/s, and rolls off at $-40$ dB/decade beyond $\omega_n$. Phase moves from $0^\circ$ to $-180^\circ$, passing about $-90^\circ$ near $\omega_n$.

![Estimated Bode and step response for Final Problem 1](figures/final-p1.svg)

**Assumptions:** time-invariant second-order dominant model; one step with added measurement noise; no explicit pure time delay beyond the step time. The parameter precision is intentionally modest because the graph is noisy.

## Problem 2 — Nyquist stability range for an integrator and RHP zeros

The printed loop is unity negative feedback with proportional $C(s)=k_p$ and

$$P(s)=\frac15\frac{(s-1)^2}{s(s+1)^2}.$$

Note the **two RHP zeros** at $+1$, but **no RHP poles**; the plant also has a pole at the origin, so a Nyquist contour must indent around $s=0$. To find the exact stability interval, form the classical closed-loop characteristic polynomial

$$1+k_pP(s)=0\quad\Longrightarrow\quad 5s(s+1)^2+k_p(s-1)^2=0,$$
$$\boxed{5s^3+(10+k_p)s^2+(5-2k_p)s+k_p=0.}$$

Normalize by 5 if desired and apply the cubic Routh conditions. With positive $k_p$, positivity demands $5-2k_p>0$, and the nontrivial determinant is

$$(10+k_p)(5-2k_p)>5k_p\quad\Longleftrightarrow\quad k_p^2+10k_p-25<0.$$

The positive root is $-5+5\sqrt2\approx2.0711$; together with $k_p>0$, the stable region is

$$\boxed{0<k_p<5(\sqrt2-1)\approx2.0711.}$$

At $k_p=0$, the loop is not asymptotically stable because an integrator pole remains. For $k_p<0$, the characteristic constant term is negative and the system has an RHP root. The supplied Nyquist plot must give the same interval when gain scales the curve relative to $-1$; the Routh calculation is an independent **verification**, not an alternative black-box design tool.

For the specified $k_p=1/4$, the magnitude simplifies unexpectedly:

$$|P(j\omega)|=\frac15\frac{|j\omega-1|^2}{|j\omega||j\omega+1|^2}=\frac1{5\omega}.$$

Thus $|k_pP(j\omega_c)|=1$ implies $\omega_c=k_p/5=\boxed{0.050\ \mathrm{rad/s}}$. For $\omega>0$, the continuously unwrapped phase is

$$\angle P(j\omega)=-90^\circ-4\tan^{-1}(\omega)\frac{180^\circ}{\pi}.$$

At $\omega_c=0.05$, phase is approximately $-101.45^\circ$, hence

$$\boxed{PM=180^\circ-101.45^\circ\approx78.55^\circ.}$$

The RHP zeros make phase more negative than a minimum-phase magnitude twin: do not infer phase margin solely from the $-20$ dB/decade magnitude slope.

![Analytic Bode and Nyquist curves for final Problem 2](figures/final-p2.svg)

## Problem 3 — Attenuate a reentry-vehicle sideslip oscillation

The plant is explicitly defined as $G(s)=\beta(s)/\delta_r(s)$, where rudder deflection $\delta_r$ is the input and sideslip angle $\beta$ the output. Model the sustained $20^\circ$ oscillation as an **additive output disturbance** $d(s)$ at frequency $\omega_f$, and use negative feedback $C(s)$ from measured sideslip to rudder.

With a zero sideslip command $r=0$,

$$\beta=GC(r-\beta)+d \quad\Rightarrow\quad \boxed{\frac{\beta}{d}=S(s)=\frac1{1+L(s)},\ \ L(s)=C(s)G(s).}$$

The original disturbance amplitude is $20^\circ$; a factor-of-ten reduction means amplitude $\le2^\circ$. Therefore the loop must satisfy

$$\boxed{|S(j\omega_f)|\le0.1\quad\Longleftrightarrow\quad |1+L(j\omega_f)|\ge10.}$$

To **avoid affecting rigid-body motions** for $\omega<0.1\omega_f$, require the complementary sensitivity $|T(j\omega)|=|L/(1+L)|$ to be small there. The conceptual required magnitude shape is: $|S|\approx1$ and $|T|\ll1$ well below the mode, a deep $S$ notch of at least $-20$ dB centered at $\omega_f$, then a return toward $|S|\approx1$ away from the controlled mode. This corresponds to a **band-pass-like loop gain peaked around $\omega_f$**, not a high-DC-gain cruise-control loop.

A conservative sufficient condition near the vibration is $|L(j\omega_f)|\ge11$; below $0.1\omega_f$ we want $|L|\ll1$. Choose a resonant or band-limited modal compensator and verify its multiple gain crossings with a full Nyquist test. Without a numerical $G(s)$, the exact controller coefficients are not identifiable from the problem, and the exam asks for **requirements and a sketch**, not unique gains.

## Problem 4 — Design a loop from a Bode plot, step error, and margins

The printed plant Bode has approximately $-20$ dB DC gain, a corner near $10$ rad/s, a $-40$ dB/decade high-frequency slope, and phase moving toward $-180^\circ$. A useful **fit to the figure** is

$$\boxed{G_{\rm fit}(s)=\frac{0.1}{(1+s/10)^2}}\quad\text{(approximate, not a provided exact plant)}.$$

A unit-step steady-state error of 0.1 in unity negative feedback requires $e_\infty=1/(1+KG(0))=0.1$. Since $G(0)\approx0.1$,

$$1+0.1K=10\quad\Rightarrow\quad\boxed{K\approx90}.\qquad(20\log_{10}90\approx39.1\text{ dB})$$

Thus the proportional loop $L_0=KG_{\rm fit}\approx9/(1+s/10)^2$ shifts the magnitude plot **up by about 39 dB without changing phase**. Its gain crossover solves $9/[1+(\omega_c/10)^2]=1$, giving $\omega_c\approx28.28$ rad/s. Phase at crossover is $-2\tan^{-1}(2.828)\approx-141.06^\circ$, so $PM\approx38.9^\circ$, **below the required $60^\circ$**. The idealized two-pole model's phase only approaches $-180^\circ$ asymptotically, so its gain margin is mathematically infinite; the **phase margin** is the failing constraint.

One valid way to retain the DC loop gain but lower crossover is **lag compensation**:

$$\boxed{C(s)=90\frac{1+s/0.3}{1+s/0.06}}.$$

The lag pole is at $-0.06$ rad/s and the zero at $-0.3$ rad/s. At DC its ratio is 1, so $C(0)=90$ and the predicted steady-state error remains 0.1; far above 0.3 rad/s, its ratio tends to 0.2, reducing loop gain near crossover by a factor of 5 without reducing the DC requirement. For the fitted plant, this produces crossover near $8.95$ rad/s, phase near $-85.2^\circ$, and therefore **$PM\approx94.8^\circ$**, exceeding 60°. Gain margin for the *idealized fitted rational model* remains infinite, exceeding 8 dB. This meets the printed criteria **for the stated fitted model**; precise results for the actual unseen plant must be measured from its data.

![Proportional and lag-compensated loop magnitude and phase](figures/final-p4.svg)

**Tradeoff:** placing a lag pole as low as 0.06 rad/s creates a slow closed-loop mode, so meeting margins and DC step error does not automatically mean fast final settling. This is a legitimate design choice only because the problem does not impose a settling-time constraint. A lead compensator could instead increase phase near a specified crossover, but can also increase crossover; it should be designed deliberately rather than guessed.

## Extra credit — Nichols chart with positive/negative gain and phase margins

The supplied Nichols curve uses magnitude in dB versus phase (displayed $0^\circ$ to $270^\circ$; the central critical point at $180^\circ,0$ dB corresponds to the usual $-180^\circ,0$ dB). Desired **gain margins $\pm8$ dB** constrain how the curve crosses the **$180^\circ$ vertical line**: one gain-increase boundary must be at most $-8$ dB and the gain-decrease boundary at least $+8$ dB where applicable. Desired **phase margins $\pm60^\circ$** constrain every intersection with the **0-dB horizontal line** to remain at least $60^\circ$ in phase from the $180^\circ$ critical direction, on both sides (for instance, at or outside 120° and 240° in the displayed convention).

**Design procedure:** shift vertical gain only if both upper and lower crossings can be moved into their required intervals simultaneously. If not, add lead/lag phase shaping in the frequency ranges where the curve approaches the forbidden neighborhood. A localized lead network supplies positive phase near its geometric-mean break frequency; a lag network supplies extra low-frequency gain while preserving crossover. One *cannot uniquely calculate pole/zero frequencies* from this Nichols trace alone, because no frequency labels or numerical $G(s)$ values accompany the curve. The output below gives the **margin target region**, not a fictitious exact controller.

![Nichols margin design boundaries](figures/final-extra.svg)
