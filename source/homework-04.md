
# Homework 4 — Bode, Nyquist, Nichols, and noise/disturbance analysis

**Source:** AE511_HW4.pdf (2 pages). The first four problems ask for three frequency-response representations of the same plant. All requested plots are recreated from the printed transfer functions, not copied as PDF screenshots.

## Problem 1 — $G_1(s)=2.5/(s^2+3s+25)$

Normalize the denominator to $s^2+2\zeta\omega_ns+\omega_n^2$:

$$\omega_n=5,\quad\zeta=\frac3{2\cdot5}=0.3,\quad G_1(0)=0.1\;(-20\text{ dB}).$$

The complex poles are $-1.5\pm j\sqrt{25-2.25}=-1.5\pm j4.770$. The Bode magnitude begins at $-20$ dB, may have a resonant bump near $\omega_r=5\sqrt{1-2(0.3)^2}\approx4.53$, then falls at $-40$ dB/decade. The phase shifts from $0^\circ$ toward $-180^\circ$. On the one-sided Nyquist curve, the path starts at $+0.1$ on the real axis and approaches the origin from the negative-real side. The Nichols plot shows the same phase/magnitude pair as a parametric curve.

![Homework 4, Problem 1: frequency-response triptych](figures/hw04-p1.svg)

## Problem 2 — $G_2(s)=0.6(s+30)/(s^2+4.2s+9)$

The denominator gives $\omega_n=3$ and $\zeta=4.2/6=0.7$, so the resonance is weak or absent. The zero is at $-30$ rad/s, well above the natural frequency. DC gain is $0.6(30)/9=2$ or $6.02$ dB. At frequencies above $3$ rad/s but below $30$ rad/s, magnitude falls approximately $-40$ dB/decade; above the zero it falls $-20$ dB/decade. Phase initially tends toward $-180^\circ$ from the pole pair and then recovers toward $-90^\circ$ from the zero.

![Homework 4, Problem 2: frequency-response triptych](figures/hw04-p2.svg)

## Problem 3 — $G_3(s)=200(s+10)/[s(s^2+14s+100)]$

There is an integrator at the origin, a zero at $-10$, and complex poles with $\omega_n=10$, $\zeta=14/20=0.7$. At low frequency,

$$G_3(j\omega)\approx\frac{200\cdot10}{(j\omega)100}=\frac{20}{j\omega},$$

so the Bode magnitude starts with a $-20$ dB/decade slope and phase near $-90^\circ$. Around $10$ rad/s the zero adds $+20$ dB/decade, while the second-order poles subtract $40$ dB/decade, leaving a high-frequency slope of $-40$ dB/decade. Because of the integrator, the Nyquist curve heads to $-j\infty$ as $\omega\to0^+$ rather than starting at a finite DC point. This is an important plot-construction detail.

![Homework 4, Problem 3: frequency-response triptych](figures/hw04-p3.svg)

## Problem 4 — $G_4(s)=-200(s-10)/[s(s^2+43s+1000)]$

The expression can be rewritten $200(10-s)/[s(s^2+43s+1000)]$. The right-half-plane zero is at $+10$ rad/s, not $-10$; the leading negative sign makes the **low-frequency effective gain positive**. The second-order pole factor has $\omega_n=\sqrt{1000}\approx31.62$ and $\zeta=43/(2\sqrt{1000})\approx0.680$.

At small $\omega$, $G_4(j\omega)\sim 2/(j\omega)$, so phase starts at $-90^\circ$. The RHP zero contributes a **negative** phase, $-\tan^{-1}(\omega/10)$, instead of the positive phase that a left-half-plane zero would contribute. The pole pair supplies another phase loss approaching $-180^\circ$. This is a nonminimum-phase system: a Bode magnitude alone cannot reveal the zero's sign.

![Homework 4, Problem 4: frequency-response triptych](figures/hw04-p4.svg)

## Problem 5 — PI cruise-control loop: $d\to y$ and $n\to y$

The plant is $G=1/(s+1)$ and the PI controller is $C=K_p+K_I/s$. With disturbance $d$ added at the plant input and sensor noise $n$ subtracted through the feedback measurement,

$$y=G[C(r-y-n)+d].$$

Setting $r=0$ and rearranging yields

$$\boxed{\frac YD=\frac{s}{s^2+(1+K_p)s+K_I}},\qquad\boxed{\frac YN=-\frac{K_ps+K_I}{s^2+(1+K_p)s+K_I}}.$$

For $K_p=1,K_I=4$,

$$D_y(s)=\frac{s}{s^2+2s+4},\qquad N_y(s)=-\frac{s+4}{s^2+2s+4}.$$

For a sinusoid, attenuation by a factor of ten means **magnitude below $0.1$** or **below $-20$ dB**, not $-10$ dB. Solving the exact magnitude equations yields the disturbance-attenuation regions

$$\boxed{\omega<0.3925\ \text{rad/s}\quad\text{or}\quad\omega>10.1905\ \text{rad/s}.}$$

The **noise response** is below $0.1$ only for $\boxed{\omega>10.839\ \mathrm{rad/s}}$. Noise cannot be strongly attenuated near DC by this controller because $|Y/N|(0)=1$ for $K_I>0$.

For general $K_I>0$, find the maximum disturbance gain using $|D_y(j\omega)|^2=\omega^2/[(K_I-\omega^2)^2+(1+K_p)^2\omega^2]$. Divide the denominator by $\omega^2$:

$$\frac1{|D_y|^2}=\frac{(K_I-\omega^2)^2}{\omega^2}+(1+K_p)^2\ge(1+K_p)^2.$$

Equality occurs at $\omega=\sqrt{K_I}$, so **exactly**

$$\boxed{\max_\omega |D_y(j\omega)|=\frac1{1+K_p}.}$$

To be **strictly smaller** than $1/10$, require $\boxed{K_p>9}$. Changing $K_I$ does not alter this peak value; it shifts the peak frequency to $\sqrt{K_I}$. This is stronger than merely observing plots, and it answers the final subquestion algebraically.

![Homework 4, Problem 5: disturbance versus sensor noise](figures/hw04-p5.svg)
