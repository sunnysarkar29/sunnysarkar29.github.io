
# Homework 2 — Laplace transforms, dominant dynamics, and sensitivity

**Source:** MAE511_HW2.pdf (3 pages). The aircraft model and a separate textbook problem are **not included** in the uploaded packet; those sections explain the exact required procedure and identify the missing data.

## Problem 1 — Aircraft trim, linearization, and transfer-function properties

The assignment asks you to run the separately supplied Simulink aircraft model, trim it, linearize it from **elevator deflection** $\delta_e$ to **pitch rate** $q$, and call `minreal`. The resulting ninth-order transfer function is not present in this PDF, so its numerical poles, zeros, relative degree, DC gain, and step response cannot be determined honestly here.

The procedure is: (1) choose the flight condition and trim point; (2) define input $\delta_e$ and output $q$; (3) obtain $A,B,C,D$ at that equilibrium; (4) compute $G_{q\delta_e}(s)=C(sI-A)^{-1}B+D$; (5) remove numerically cancelling pole-zero pairs with an appropriate tolerance; (6) extract zeros/poles, relative degree $n_p-n_z$, gain $G(0)$ when defined, and the unit-step response. **Do not count a pole cancelled by `minreal` as a pole of the minimal input-output realization.**

```matlab
% Replace syslin with your actual elevator-to-pitch-rate linearized model.
sys = minreal(syslin);
[z,p,k] = zpkdata(sys,'v');
nzeros = numel(z); npoles = numel(p);
relative_degree = npoles - nzeros;
dc_gain = dcgain(sys);
figure; step(sys); grid on;
title('Pitch rate due to unit elevator step');
```

If you provide the Simulink file or its transfer function, this section can be completed numerically.

## Problem 2 — Differential equations to transfer functions

Use **zero initial conditions** so $\mathcal L\{\dot x\}=sX$ and $\mathcal L\{\ddot x\}=s^2X$. For $m\ddot x+c\dot x+kx=u+b\dot u$, collect $X$ and $U$:

$$(ms^2+cs+k)X=(1+bs)U\quad\Rightarrow\quad\boxed{\frac XU=\frac{1+bs}{ms^2+cs+k}}.$$

The input derivative produces a numerator zero at $s=-1/b$ (for $b\neq0$). This affects the transient even if the poles are unchanged.

The second equation, **confirmed by checking the equation glyphs in the source PDF**, is $\dddot y+\ddot y+y=u$. Under zero initial conditions,

$$(s^3+s^2+1)Y=U\quad\Rightarrow\quad\boxed{\frac{Y(s)}{U(s)}=\frac1{s^3+s^2+1}.}$$

This is **third order**, not second order. Its Routh array has first column $[1,1,-1,1]$, which contains **two sign changes** and thus two right-half-plane roots; the model is unstable. The exact derivative order matters: three dots denote third derivative and two dots denote second derivative.

Finally,

$$\ddot x+2\zeta\omega_n\dot x+\omega_n^2x=\omega_n^2u\quad\Rightarrow\quad\boxed{\frac XU=\frac{\omega_n^2}{s^2+2\zeta\omega_ns+\omega_n^2}}.$$

This normalization makes the DC gain exactly one; poles are $-\zeta\omega_n\pm j\omega_n\sqrt{1-\zeta^2}$ for $0<\zeta<1$.

## Problem 3 — Textbook Problems 3.7(a,b)

Only the reference to textbook Problem 3.7(a,b) is supplied, **not the statement or its diagrams**. Therefore a unique solution is impossible without that page. The reusable technique is: identify the input/output variables, take zero-initial-condition Laplace transforms, isolate $Y/U$, cancel common factors only if justified, and check numerator and denominator degrees. The absence of the textbook problem is recorded rather than replaced with a fictitious question.

## Problem 4 — Dominant poles and time-scale separation

The three systems are

$$G_1(s)=\frac a{s+a},\quad G_2(s)=\frac{b^2}{s^2+0.6bs+b^2},\quad G_3(s)=G_1(s)G_2(s).$$

For $a=1,b=10$, $G_1$ has slow pole $-1$, whereas $G_2$ has poles $-3\pm j9.54$. Their dynamics decay roughly three times faster; a large part of the composite step closely follows $G_1$ after the quick oscillation dies away. Therefore $G_3$ resembles the slower first-order response more than the faster second-order response, although the leading edge differs.

For $a=10,b=1$, $G_1$ has pole $-10$ and $G_2$ has poles $-0.3\pm j0.954$. The second-order pair is slow; $G_3$ closely tracks $G_2$ after the fast $-10$ transient. Thus the **dominant** poles are those closest to the imaginary axis, *provided the corresponding residues are not tiny and no nearby zeros change their influence*. The figure in this guide plots the requested cases.

![Dominant-pole step responses](figures/hw02-dominant.svg)

## Problem 5 — Four closed-loop paths

From the drawing: $r$ is compared with $y+n$, the controller is $C$, the input disturbance $d_i$ is added **after** $C$ but before $G$, and $d_o$ is added after $G$. Write

$$e=r-(y+n),\quad y=G(Ce+d_i)+d_o.$$

Substitution yields $(1+GC)y=GC r-GC n+Gd_i+d_o$, so

$$\boxed{y=\underbrace{\frac{GC}{1+GC}}_T r-\underbrace{\frac{GC}{1+GC}}_T n+\underbrace{\frac G{1+GC}}_{GS}d_i+\underbrace{\frac1{1+GC}}_S d_o.}$$

The **same denominator $1+GC$** appears in all four paths because they share the same closed-loop poles. High loop gain suppresses output disturbances through $S$, but it sends measurement noise to the output through approximately $-T\approx-1$ at those frequencies. This is why good disturbance rejection and noise rejection are complementary design objectives rather than independent choices.
