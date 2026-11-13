
# Midterm exam — Fully worked study solutions

**Source:** AE511_midterm.pdf (10 pages; five problems). These are explanatory solutions, not a reproduction of the exam pages. Figure-reading answers are tied to the supplied plots and are described with their assumptions.

## Problem 1 — Longitudinal bus model: Newton's law to transfer function

The bus has mass $m$, applied engine force $u$, and aerodynamic drag $F_A=k\dot x^2$. Assume forward motion $v=\dot x\ge0$, level ground, and no additional rolling resistance. Newton's second law along the travel axis gives

$$m\ddot x=u-k\dot x^2.\tag{1}$$

Defining speed $v=\dot x$ produces the first-order nonlinear state equation

$$\boxed{m\dot v=u-kv^2.}\tag{2}$$

A constant-speed equilibrium has $\dot v=0$ when $v=v_0$. Therefore the constant input needed to balance drag is

$$\boxed{u_0=kv_0^2.}\tag{3}$$

To linearize, let $v=v_0+\delta v$ and $u=u_0+\delta u$ and expand the square:

$$m\delta\dot v=u_0+\delta u-k(v_0^2+2v_0\delta v+(\delta v)^2).$$

The equilibrium terms cancel since $u_0=kv_0^2$. For small departures neglect $(\delta v)^2$, yielding

$$\boxed{m\delta\dot v+2kv_0\delta v=\delta u.}\tag{4}$$

Take the Laplace transform under zero initial perturbation:

$$(ms+2kv_0)\Delta V(s)=\Delta U(s),\qquad \boxed{G(s)=\frac{\Delta V(s)}{\Delta U(s)}=\frac1{ms+2kv_0}.}$$

The pole is $-2kv_0/m$, and the local time constant is $m/(2kv_0)$ for $v_0>0$. The local DC gain $1/(2kv_0)$ gives incremental speed change per incremental force. **Why the transfer function is incremental:** the system's actual input/output contain nonzero offsets $(u_0,v_0)$; a transfer function derived from linearization relates $\delta u$ to $\delta v$, not the full nonlinear variables.

At $v_0=0$, the Jacobian drag term vanishes and the small-signal model becomes an integrator $1/(ms)$; this special case must not be assigned the positive-speed time constant. For reverse motion, physical drag should be written $kv|v|$ with opposing sign, and linearized consistently.

## Problem 2 — Match four transfer functions to four step-response plots

The given functions are

$$G_1=\frac1{s^2+0.1s+1},\quad G_2=\frac1{s^2+s+10},\quad G_3=\frac{s-1}{(s+1)^2},\quad G_4=\frac{s+1}{(s+1)^2}=\frac1{s+1}.$$

**Match:** $\boxed{G_1\to D,\quad G_2\to A,\quad G_3\to C,\quad G_4\to B.}$ Each pair has an independent physical/mathematical justification:

- **$G_1\to D$:** $\omega_n=1,\ 2\zeta\omega_n=0.1\Rightarrow\zeta=0.05$. Its poles $-0.05\pm j0.9987$ are very lightly damped, giving a long-lived oscillation with final value $G_1(0)=1$. Plot D has exactly this combination and a long time axis.
- **$G_2\to A$:** $\omega_n=\sqrt{10}\approx3.162$, $\zeta=1/(2\sqrt{10})\approx0.158$. Its much faster oscillations decay more rapidly than $G_1$; its final value is $G_2(0)=1/10=0.1$. Plot A oscillates around **0.1**, not around 1.
- **$G_3\to C$:** poles at $-1$ are stable, but the numerator zero is at $+1$, in the **right half-plane**. Its DC gain is $G_3(0)=-1$, so a positive step eventually produces a negative final response. The nonminimum-phase zero can create an initial movement opposite the final direction; plot C rises briefly and then decays toward **$-1$**.
- **$G_4\to B$:** after exact pole-zero cancellation, $G_4=1/(s+1)$. This is a first-order, monotone, non-overshooting response to final value 1 with time constant 1 s, precisely the shape of B.

This is a stronger answer than elimination because it predicts time scales, final gains, overshoot and inverse response for **each** transfer function.

![Recreated midterm Problem 2 response shapes](figures/midterm-stepmatch.svg)

## Problem 3 — PI controller: stability and transient specifications

The diagram has $C(s)=k_p+k_I/s$ and plant $G(s)=a/(s+a)$ with $a>0$. Input disturbance and sensor noise enter other branches, but the reference-to-output characteristic equation uses the loop $L=CG$:

$$1+\frac{a(k_ps+k_I)}{s(s+a)}=0\ \Longrightarrow\ \boxed{s^2+a(1+k_p)s+ak_I=0.}$$

For a second-order polynomial $s^2+b s+c$, asymptotic stability is equivalent to $b>0$ and $c>0$. Thus

$$\boxed{k_p>-1,\qquad k_I>0.}$$

The desired reference-to-output function is

$$T(s)=\frac{a(k_ps+k_I)}{s^2+a(1+k_p)s+ak_I}.$$

Match the **denominator** with $s^2+2\zeta\omega_ns+\omega_n^2$:

$$\omega_n^2=ak_I,\quad 2\zeta\omega_n=a(1+k_p).$$

If we choose an underdamped design with $\zeta\approx0.7$, the usual approximations $t_r\approx1.8/\omega_n$ and $t_s(2\%)\approx4/(\zeta\omega_n)$ suggest

$$\omega_n>\max\left(\frac{1.8}{T_r},\frac4{\zeta T_s}\right),\qquad\boxed{k_I=\frac{\omega_n^2}{a},\quad k_p=\frac{2\zeta\omega_n}{a}-1.}$$

**Important subtlety:** $T(s)$ has a numerator zero at $s=-k_I/k_p$ for $k_p\ne0$. Therefore the textbook second-order rise/settling formulas are only **design estimates**, not exact guarantees; verify the actual step response for the chosen gains and adjust as needed. If no particular numerical $a,T_r,T_s$ are specified, the symbolic family above is the complete meaningful answer.

## Problem 4 — Match controller values to disturbance Bode plots

For $G(s)=1/(s+1)$ and $C(s)=k_p+k_I/s$, an input disturbance $d$ added before the plant gives

$$\boxed{\frac YD=\frac{s}{s^2+(1+k_p)s+k_I}}\quad(k_I>0),\qquad\frac YD=\frac1{s+1+k_p}\quad(k_I=0).$$

When $k_I=0$, the disturbance path is first-order and has nonzero DC gain $1/(1+k_p)$. Thus **$k_p=1,k_I=0\to B$** (DC magnitude 0.5) and **$k_p=10,k_I=0\to D$** (DC magnitude $1/11\approx0.091$). The plotted phase approaches $-90^\circ$ in both cases.

When $k_I>0$, the path has a **zero at the origin**: low-frequency magnitude starts at zero and rises at $+20$ dB/decade. With $k_p=1,k_I=1$, the denominator is $(s+1)^2$ with no sharp resonance; this is **plot A**. With $k_p=1,k_I=10$, the denominator is $s^2+2s+10$ with natural frequency $\sqrt{10}$ and damping $\zeta=1/\sqrt{10}\approx0.316$, producing the resonant peak at higher frequency seen in **plot C**.

Therefore the table is $\boxed{(1,0)\to B,\ (10,0)\to D,\ (1,1)\to A,\ (1,10)\to C.}$ Again, the justification uses the **DC asymptote, order, zero at the origin, resonant frequency and high-frequency slope**, not elimination.

![Recreated disturbance Bode plot families](figures/midterm-disturbance.svg)

## Problem 5 — Disturbance feedforward plus feedback

The drawing measures the gust disturbance $d_0$, sends it through the disturbance path $G_d$, and also sends it through a feedforward controller $C_2$ into the plant input. The feedback controller is $C_1$ and the plant is $G$. With $r=0$,

$$e=-y,\quad u=C_1e+C_2d_0=-C_1y+C_2d_0,\quad y=Gu+G_dd_0.$$

Substitute $u$ and collect the $y$ terms:

$$(1+GC_1)y=(GC_2+G_d)d_0,$$
$$\boxed{\frac{Y}{D_0}=\frac{GC_2+G_d}{1+GC_1}.}$$

Perfect cancellation of a measured disturbance in the ideal model requires the numerator to vanish:

$$\boxed{C_2(s)=-\frac{G_d(s)}{G(s)}.}$$

This is **feasible only** if the required feedforward transfer function is causal, proper and stable (and the disturbance is measured in time). Inverting $G$ can demand unstable pole cancellation when $G$ has RHP zeros, or demand differentiation when $G$ has higher relative degree than $G_d$. Physical sensor latency also prevents perfect cancellation of a fast gust.

If feedforward is imperfect, increase stable loop gain at gust frequencies so $|S|=1/|1+GC_1|$ falls, use a better gust sensor/estimator, or redesign the feedforward model. Check noise, actuator authority, phase margin, and robustness: high gain is not universally better.
