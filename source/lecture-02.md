# Lecture 2: LTI systems, Laplace transforms, and transient response

Our linearized models become most useful when we exploit the two defining LTI properties—superposition and time invariance. Together these lead to convolution, whose Laplace transform turns a differential equation into ordinary algebra. This lecture develops transfer functions, their poles and zeros, and the characteristic step responses of first- and second-order systems.

## 1. Superposition and time invariance revisited

For a linear input-output operator $\mathcal S$, superposition says

$$\mathcal S[\alpha u_1+\beta u_2]=\alpha\mathcal S[u_1]+\beta\mathcal S[u_2].$$

For a time-invariant operator, a delay in the applied input produces precisely the same delay in its response: if $u(t)$ generates $y(t)$, then $u(t-\tau)$ generates $y(t-\tau)$. These properties permit an arbitrary input to be assembled from weighted, shifted impulses and its output to be assembled from the corresponding impulse responses.

Linearity of a nonlinear-looking formula must not be inferred from the appearance of one term: for example, squaring a state destroys superposition, whereas using a constant linear combination of states does not.

### What the superposition assumption buys us

Imagine applying two voltage signals to a motor: one is a slow command, the other a small sinusoidal test. In a linear model, we can calculate each response independently and add them. This is why the decomposition of an arbitrary signal into impulses, steps, or sinusoids is useful. A nonlinear actuator with saturation cannot make this promise: the response to the sum may be very different from the sum of responses.

Time invariance permits a second simplification. If the response to a pulse at $t=0$ is known, the response to the same pulse at $t=3$ is the same waveform delayed by three seconds. These two properties—superposition and time shifts—are exactly what the convolution integral exploits. When using transfer functions, distinguish the input-driven response from the response caused by stored energy in nonzero initial conditions.

## 2. The impulse response determines every zero-state output

Let $\delta(t)$ denote the unit impulse, idealized by $\int_{-\infty}^{\infty}\delta(t)\,dt=1$. Let $h(t)$ be the output when $\delta(t)$ is applied to an LTI system at rest. The identity

$$u(t)=\int_{-\infty}^{\infty}u(\tau)\delta(t-\tau)\,d\tau$$

writes any suitable signal as a continuous superposition of shifted impulses. Linearity and time invariance then give the **convolution integral**

$$\boxed{y(t)=(h*u)(t)=\int_{-\infty}^{\infty}h(t-\tau)u(\tau)\,d\tau.}$$

For causal systems, $h(t)=0$ when $t<0$; when the input is also causal, the integral reduces to $\int_0^t h(t-\tau)u(\tau)\,d\tau$. Convolution is the general time-domain answer to an input-output problem, but evaluating the integral directly can be cumbersome.

### Derive convolution from short pulses

Divide the input timeline into tiny intervals of width $\Delta\tau$. Near time $\tau_k$, the small area $u(\tau_k)\Delta\tau$ behaves like a scaled impulse. An impulse applied at $\tau_k$ produces $h(t-\tau_k)$, so its contribution at time $t$ is approximately $u(\tau_k)h(t-\tau_k)\Delta\tau$. Add the contributions and take the limit:

$$y(t)=\int_0^t h(t-\tau)u(\tau)\,d\tau\quad\text{(causal zero-state system)}.$$

For a first-order system with impulse response $h(t)=e^{-2t}1(t)$, a unit-step input has output $y(t)=\int_0^t e^{-2(t-\tau)}d\tau=(1-e^{-2t})/2$. This one calculation demonstrates that an impulse response is a complete description of a causal LTI system's zero-state behavior. Initial conditions require an additional zero-input term.

## 3. The unilateral Laplace transform

For a causal signal, define

$$F(s)=\mathcal L\{f(t)\}=\int_0^\infty f(t)e^{-st}\,dt,\qquad s=\sigma+j\omega.$$

The Laplace transform has several important properties:

$$\begin{aligned}\mathcal L\{af+bg\}&=aF+bG,\\ \mathcal L\{f(t-a)\mathbf1_{t\ge a}\}&=e^{-as}F(s),\\ \mathcal L\{\dot f\}&=sF(s)-f(0^-),\\ \mathcal L\{\ddot f\}&=s^2F(s)-sf(0^-)-\dot f(0^-),\\ \mathcal L\left\{\int_0^t f(\tau)d\tau\right\}&=\frac{F(s)}s.\end{aligned}$$

In particular, convolution becomes multiplication:

$$\boxed{\mathcal L\{h*u\}=H(s)U(s).}$$

This is the fundamental computational advantage. Instead of manipulating convolution integrals, we multiply rational functions of $s$. Initial conditions should not be silently discarded: the derivative identities above show exactly where they enter.

### Why the Laplace transform simplifies dynamics

Differentiation becomes algebraic because $\mathcal L\{\dot x\}=sX(s)-x(0^-)$. The initial-condition term is vital: it represents energy already stored in the system. With zero initial conditions, a differential equation becomes a polynomial equation in $s$. The complex variable $s=\sigma+j\omega$ has two roles: $\sigma$ describes exponential growth or decay; $\omega$ describes oscillation.

For $\dot x+3x=u$, $x(0)=2$, and $u(t)=1$, the transform is $(s+3)X=1/s+2$. Hence

$$X(s)=\frac{1}{3s}+\frac{5}{3(s+3)},\qquad x(t)=\frac13+\frac53e^{-3t}.$$

Check the endpoints: $x(0)=2$ and $x(\infty)=1/3$. A common mistake is dropping the $x(0)$ term before the problem has stated zero initial conditions.

## 4. Transfer functions from differential equations

Consider a mass-spring-damper system:

$$m\ddot x+c\dot x+kx=A\,u.$$

Under **zero initial conditions**, transform both sides:

$$(ms^2+cs+k)X(s)=A\,U(s).$$

The input-output transfer function is

$$\boxed{G(s)=\frac{X(s)}{U(s)}=\frac{A}{ms^2+cs+k}.}$$

A transfer function is the ratio of the transformed output and transformed input under zero initial conditions. For a general LTI state-space model,

$$\dot x=Ax+Bu,\quad y=Cx+Du\quad\Longrightarrow\quad G(s)=C(sI-A)^{-1}B+D.$$

For a multi-input, multi-output system this is a matrix of transfer functions. The transfer function omits information about the response to nonzero initial state, and cancellations can hide internal modes.

### From physical law to transfer function

Start with $m\ddot x+c\dot x+kx=F$. With zero initial conditions, $(ms^2+cs+k)X(s)=F(s)$, so the force-to-displacement transfer function is $G(s)=1/(ms^2+cs+k)$. If the measured output were velocity, the transfer function would instead be $s/(ms^2+cs+k)$. Thus **the same plant can have different transfer functions depending on its input and output definitions**.

A transfer function does not by itself reveal every internal physical state. It compactly describes zero-state input-output behavior. The state-space model retains internal dynamics, while the transfer function can hide modes canceled by pole-zero cancellation. This matters if internal stability is important: an apparently benign transfer function may omit an unstable unobservable or uncontrollable mode.

## 5. Poles, zeros, gain, and properness

Write a scalar rational transfer function as

$$G(s)=K\frac{(s-z_1)\cdots(s-z_m)}{(s-p_1)\cdots(s-p_n)}.$$

A **zero** is a root of the numerator, and a **pole** is a root of the denominator after algebraic cancellations. A gain $K$ scales the response; poles shape its free natural modes, while zeros determine how those modes combine in the measured output.

The **relative degree** is $n-m$. A transfer function is *proper* if $n\ge m$ and *strictly proper* if $n>m$. Ordinary physical plants are usually strictly proper, since an input cannot instantaneously change a position or a velocity without an impulsive effect. A pure differentiator $G(s)=s$ is not proper and is not implemented exactly in noisy physical systems.

The DC gain, when finite, is $G(0)$, the gain seen by a constant input after transients decay. The $s$-domain variable is complex; its real part controls exponential growth or decay, and its imaginary part controls oscillation.

### Understand poles before drawing responses

Factor $G(s)$ into numerator and denominator polynomials. A simple pole at $s=-a$ produces an $e^{-at}$ term in the time response; a complex pair $\sigma\pm j\omega$ produces $e^{\sigma t}$ multiplied by a sinusoid. Zeros change the mixture of these modes and can create initial undershoot or large transient amplitudes, but closed-loop stability is generally determined by the uncanceled closed-loop modes.

Properness concerns high-frequency behavior. A rational transfer function is proper when numerator degree does not exceed denominator degree and strictly proper when it is lower. A pure differentiator $G(s)=s$ is improper and cannot be implemented as an ideal causal finite-bandwidth physical system. Real controllers approximate differentiation with a roll-off filter, a practical issue revisited in PID design.

## 6. Open-loop versus closed-loop poles

A plant can be placed in open loop, $Y=GU$, or inside a feedback loop, $Y=G(R-Y)$ for unit feedback. In the latter case,

$$\frac{Y(s)}{R(s)}=\frac{G(s)}{1+G(s)}.$$

The poles of this closed-loop transfer function are generally **not the plant's open-loop poles**. As an example, let $G(s)=1/(s+5)$. Unity negative feedback produces

$$\frac{Y}{R}=\frac{1}{s+6},$$

so the closed-loop pole is at $-6$, not $-5$. If a controller $C(s)$ multiplies the plant, the characteristic equation is $1+C(s)G(s)=0$. Controller design is largely the art of moving closed-loop poles into desirable positions while respecting other constraints.

### A pole is a root of the relevant denominator

The open-loop poles are roots of the plant or loop transfer denominator. Closing a loop changes the characteristic equation. If $G=1/(s+1)$ and $C=K$, then $L=K/(s+1)$ has a pole at $-1$, but $T=K/(s+1+K)$ has a pole at $-(1+K)$. Increasing gain moves the closed-loop pole, not the plant pole.

For a more revealing example, let $G(s)=1/[s(s+1)]$ and $C=K$. The characteristic polynomial becomes $s^2+s+K$. Its roots change with $K$: for $K>1/4$ they are complex and the response oscillates. This is an early example of a **root locus**, the path of closed-loop poles as gain varies. Always specify whether a pole list refers to $G$, $L$, $S$, or $T$.

## 7. Factored forms and a model's order

When coefficients are real, complex poles occur in conjugate pairs. It is often useful to factor an overall transfer function into first-order and second-order terms:

$$G(s)=K\,\frac{\prod_i(s-z_i)}{\prod_i(s-p_i)}.$$

The denominator order measures how many modes appear in a minimal input-output realization. A *first-order* pole contributes a decaying exponential; a complex-conjugate pair contributes damped oscillation. An LTI model's behavior is determined jointly by poles, zeros, gain, and input—not by the poles alone.

### Order, time constants, and physical interpretation

For a factored denominator $(s+a)(s+b)$, the corresponding decay time constants are $1/a$ and $1/b$ when $a,b>0$. If one pole is at $-0.5$ and another at $-20$, the slow decay takes roughly two seconds per time constant while the fast one dies in $0.05$ seconds. After a short transient, the slow pole dominates.

The apparent order can drop if algebra cancels a pole with a zero. Such a cancellation is rarely exact in physical hardware: if a controller zero is designed to cancel an unstable plant pole, even small uncertainty may expose the unstable mode. Treat pole-zero cancellation as a modeling convenience, not an automatic robustness guarantee. Repeated poles also change the time-domain form, introducing $t e^{pt}$ terms rather than only pure exponentials.

## 8. First-order impulse and step responses

For

$$G(s)=\frac{K}{\tau s+1},\qquad\tau>0,$$

the impulse response is $h(t)=(K/\tau)e^{-t/\tau}$ for $t\ge0$. A unit step has transform $U(s)=1/s$, so

$$Y(s)=\frac{K}{s(\tau s+1)}=K\left(\frac1s-\frac{1}{s+1/\tau}\right).$$

Inverting term by term gives

$$\boxed{y_{\mathrm{step}}(t)=K(1-e^{-t/\tau}),\qquad t\ge0.}$$

The output approaches $K$ monotonically. At one time constant it has traversed about $63.2\%$ of its total change. Larger $\tau$ means a slower response; a pole farther to the left, at $-1/\tau$, means faster decay.

### Build intuition for a single real pole

A normalized first-order closed-loop model is $T(s)=1/(\tau s+1)$. For a unit step, $y(t)=1-e^{-t/\tau}$; at $t=\tau$ the output has reached approximately $63.2\%$ of its final value. At $3\tau$ it is about $95\%$, and at $4\tau$ roughly $98.2\%$. The pole is at $-1/\tau$: farther left means a smaller time constant and a faster response.

If the static gain is $K_0$ instead, $T=K_0/(\tau s+1)$, the final value is $K_0$ for a unit step. Speed and accuracy are separate: the denominator determines the transient rate while $T(0)$ determines the steady output. A time constant is not a delay; the first-order response starts changing immediately after the step.

## 9. Partial fractions: a non-oscillatory second-order example

The handwritten calculations use a plant $G(s)=10/(s+5)$ as one first-order example. For a step,

$$\frac{Y(s)}{U(s)}=\frac{10}{s+5},\qquad U(s)=\frac1s,\qquad Y(s)=\frac{10}{s(s+5)}.$$

To invert, write $Y(s)=A/s+B/(s+5)$. Multiplying through by $s(s+5)$ yields $10=A(s+5)+Bs$. Substituting $s=0$ gives $A=2$; substituting $s=-5$ gives $B=-2$. Therefore,

$$\boxed{y(t)=2\left(1-e^{-5t}\right),\quad t\ge0.}$$

This derivation illustrates the cover-up or substitution method of partial fractions. For repeated poles, additional terms of the form $1/(s+a)^k$ appear and invert to polynomial-times-exponential functions.

### Partial fractions turn algebra into modes

Suppose $Y(s)=2/[(s+1)(s+2)]$. Write $Y=A/(s+1)+B/(s+2)$. Multiplying through and evaluating at $s=-1$ gives $A=2$; at $s=-2$ gives $B=-2$. Therefore $y(t)=2e^{-t}-2e^{-2t}$ for $t\ge0$. It starts at zero, rises, and then decays to zero.

The sign of a partial-fraction coefficient is not itself a statement about stability. Stability comes from the pole locations; coefficients determine how the modes combine. As a check, inspect $y(0)$ and $y(\infty)$ before trusting your algebra. Repeated poles require terms such as $A/(s+a)+B/(s+a)^2$, whose inverse transforms include $B t e^{-at}$.

## 10. Standard second-order system

A second-order low-pass system is conventionally written

$$\boxed{G(s)=\frac{K\omega_n^2}{s^2+2\zeta\omega_n s+\omega_n^2},}$$

where $\omega_n$ is the undamped natural frequency, $\zeta$ is the damping ratio, and $K$ is DC gain. Dividing an expression $A/(ms^2+cs+k)$ by $m$ identifies

$$\omega_n=\sqrt{\frac{k}{m}},\qquad\zeta=\frac{c}{2\sqrt{km}},\qquad K=\frac{A}{k}.$$

The poles are

$$s_{1,2}=-\zeta\omega_n\pm\omega_n\sqrt{\zeta^2-1}.$$

When $0<\zeta<1$ the poles are complex conjugates $-\zeta\omega_n\pm j\omega_d$, where $\omega_d=\omega_n\sqrt{1-\zeta^2}$; the response oscillates while decaying. At $\zeta=1$ the system is critically damped; at $\zeta>1$ it is overdamped. Negative damping produces an unstable right-half-plane pole.

### Recognize the standard second-order denominator

The canonical denominator $s^2+2\zeta\omega_n s+\omega_n^2$ separates two physical ideas. The natural frequency $\omega_n$ sets an overall speed scale; the damping ratio $\zeta$ determines whether that motion overshoots or oscillates. A mechanical system $m\ddot x+c\dot x+kx=u$ has $\omega_n=\sqrt{k/m}$ and $\zeta=c/(2\sqrt{km})$.

For example, $s^2+4s+25$ corresponds to $\omega_n=5$ rad/s and $\zeta=4/(2\cdot 5)=0.4$. Its damped oscillation frequency is $\omega_d=\omega_n\sqrt{1-\zeta^2}\approx4.58$ rad/s. Do not mistake the coefficient of $s$ for $\zeta$; it equals $2\zeta\omega_n$.

## 11. Reading the pole plane

The location of a pole $p=\sigma+j\omega$ has a direct time-domain interpretation:

$$e^{pt}=e^{\sigma t}\big(\cos\omega t+j\sin\omega t\big).$$

The real part $\sigma$ controls the envelope and the imaginary part $\omega$ controls the oscillation frequency. Left-half-plane poles decay, right-half-plane poles grow, and poles on the imaginary axis require separate consideration because they do not automatically decay. This geometric interpretation sets up the transient-response and stability arguments in the next lecture.

### Read the complex plane as a map of behavior

The real part of a pole controls the exponential envelope. The imaginary part controls oscillation frequency. A pole at $-1+3j$ yields a transient proportional to $e^{-t}\cos(3t+\phi)$; a pole at $-4+3j$ oscillates at the same angular frequency but decays much faster. A right-half-plane pole has a positive exponential envelope and signals instability in the associated mode.

When sketching pole locations, draw vertical lines for equal decay rate and rays from the origin for equal damping ratio. Complex poles closer to the imaginary axis tend to produce longer-lasting oscillations. For a strictly stable finite-dimensional continuous-time LTI model, every internal pole must have negative real part. Poles *on* the imaginary axis demand more careful distinctions between marginal behavior and BIBO stability.


## Practice problems and worked solutions

### Problem 1 — Transform a differential equation

For $2\dot y+6y=4u$ with zero initial condition, find $G(s)=Y/U$ and the pole.

**Worked solution.** $(2s+6)Y=4U$, so $G=4/(2s+6)=2/(s+3)$. The pole is $-3$, the time constant is $1/3$ s, and the DC gain is $2/3$.

### Problem 2 — First-order step response

Find the unit-step response of $G(s)=3/(s+3)$.

**Worked solution.** $Y(s)=3/[s(s+3)]=1/s-1/(s+3)$, hence $y(t)=1-e^{-3t}$ for $t\ge0$. The output has reached approximately $63.2\%$ at $t=1/3$ s.

### Problem 3 — Classify the poles

For $G(s)=25/(s^2+6s+25)$, find $\omega_n$, $\zeta$, and $\omega_d$.

**Worked solution.** $\omega_n=5$, $2\zeta\omega_n=6$, so $\zeta=0.6$. The damped frequency is $\omega_d=5\sqrt{1-0.6^2}=4$ rad/s, and the poles are $-3\pm j4$.



## Exam mastery — Deriving transfer functions and judging order

### The Laplace transform with initial conditions

The derivative rule is $\mathcal L\{\dot x\}=sX-x(0^-)$ and $\mathcal L\{\ddot x\}=s^2X-sx(0^-)-\dot x(0^-)$. A transfer function $G=Y/U$ assumes **zero initial state**; otherwise the output has an additional free-response term that is not caused by $U$. For $m\ddot x+c\dot x+kx=u+b\dot u$,

$$(ms^2+cs+k)X=(1+bs)U\quad\Longrightarrow\quad G(s)=\frac{1+bs}{ms^2+cs+k}.$$

Ask what the numerator means physically: differentiating the actuator signal adds a zero. It can make the initial slope larger without changing the plant's natural modes. This is how Homework 2 connects the ODE to the later overshoot analysis.

### Why poles determine modes while zeros determine participation

If $G(s)=N(s)/D(s)$ is proper with simple poles $p_i$, its impulse response has a partial-fraction form $h(t)=\sum_i r_i e^{p_it}$, where residues $r_i=N(p_i)/D'(p_i)$. Every pole gives a possible time mode, but a small residue means that mode contributes little to the selected output. This is why deleting a fast pole based on its location alone can be wrong, and why a nearby zero may cancel or suppress a mode.

**Example:** $G(s)=\frac{s+10}{(s+1)(s+10.01)}$. The pole at $-10.01$ is very nearly cancelled by a zero at $-10$, so the step resembles the much simpler first-order response $1/(s+1)$ after modest gain matching. Compare $G(0)=10/10.01$ with the reduced system's gain before concluding they are equal.

### Step response from partial fractions

For a unit step, $Y(s)=G(s)/s$. With $G(s)=a/(s+a)$, write $Y=a/[s(s+a)]=1/s-1/(s+a)$, so $y(t)=1-e^{-at}$ for $t\ge0$. It reaches $63.2\%$ of its final value at $t=1/a$. For a repeated real pole $(s+a)^{-2}$ the response contains $t e^{-at}$, which explains the distinctive shape of a critically damped second-order system.

**Practice.** $G(s)=2/(s+2)$ has $y(t)=1-e^{-2t}$, time constant $0.5$ s and approximate 10–90% rise time $2.2/2=1.1$ s. Always check $y(0^+)$ and $y(\infty)$ from initial/final value theorems.



---

<!-- Exam-ready derivation lab — HTML supplement; editable, preserved exactly as on the web page. -->

<section class="mastery-lab" id="deep-derivation"><p class="lab-kicker">Transfer-function fluency</p><h2>Derivation lab: let the derivative order determine the denominator</h2>
<p>Homework 2 asks you to transform differential equations into input-output transfer functions. The essential assumption is <strong>zero initial conditions</strong>; only then is <span class="math">\(\mathcal L\{\dot x\}=sX\)</span> without an extra initial-value term.</p>
<div class="math-block">\[m\ddot x+c\dot x+kx=u+b\dot u\quad\Longrightarrow\quad(ms^2+cs+k)X=(1+bs)U.\]</div>
<p>Divide by the coefficient of <span class="math">\(X\)</span> to get <span class="math">\(G(s)=(1+bs)/(ms^2+cs+k)\)</span>. The input derivative creates a <em>zero</em> at <span class="math">\(-1/b\)</span>; it does not add a pole. By contrast, the distinctly third-order equation in the assignment is</p>
<div class="math-block">\[\dddot y+\ddot y+y=u\quad\Longrightarrow\quad\boxed{G(s)=\frac1{s^3+s^2+1}}.\]</div>
<p>Check the roots’ stability rather than assuming a positive-coefficient denominator is stable. The cubic’s Routh first column is <span class="math">\(1,\ 1,\ -1,\ 1\)</span>, with two sign changes, hence two right-half-plane poles.</p>
<details class="quick-check"><summary>Why does a nonzero initial condition invalidate the transfer-function shortcut?</summary><p>For example <span class="math">\(\mathcal L\{\dot x\}=sX-x(0)\)</span>. A transfer function describes the zero-state input-to-output map; initial-condition responses must be handled separately.</p></details><p class="exam-link">Practice with <a href="homework-02.html">Homework 2, Problem 2</a>.</p></section>
