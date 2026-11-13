# Lecture 1: Introduction, linearization, and block diagrams

The central problem of feedback control is to make a physical system behave predictably despite uncertainty, disturbances, and imperfect sensors. This lecture establishes the language used throughout the course: **plant**, **controller**, **sensor**, **reference**, **error**, **state**, and **feedback**. It then connects nonlinear dynamical models to the linear state-space models that classical control uses, and introduces the rules for simplifying block diagrams.

## 1. What a feedback controller does

Consider a rocket navigation-and-control loop. Guidance supplies a desired trajectory; navigation estimates position, velocity, and attitude using sensors such as an inertial measurement unit or GPS; the controller compares the desired motion with that estimate and commands the actuators. The controlled body—the rocket, aircraft, or other mechanical system—is the **plant**. It is the plant, rather than the controller, that is governed by physical laws.

The essential signals are the reference $r(t)$, measured output $y_m(t)$, tracking error $e(t)$, actuator command $u(t)$, and actual plant output $y(t)$. With negative feedback,

$$e(t)=r(t)-y_m(t),\qquad u(t)=\mathcal C[e](t).$$

A sensor may supply $y_m=y+n$ with measurement noise $n$. A disturbance may enter the plant independently of the commanded input. These distinctions matter because noise, reference commands, and disturbances do not have the same transfer function to the output.

A controller acts using what it can measure or estimate; it does not have access to the true state unless the state is directly observed. **Open-loop control** applies a predetermined command without correcting the observed error. **Closed-loop control** uses the error signal to correct model mistakes and disturbances. Feedback's benefits are accuracy and robustness, but poorly chosen feedback can amplify noise or destabilize the closed loop.

### Think of the loop as a repeated correction process

A thermostat is a useful mental model. The desired temperature is the **reference**; the sensor reports the actual temperature; subtracting the measurement produces the **error**; and the heater command is the **control input**. The controller does not need a perfect thermal model if it can repeatedly observe the effect of its actions. But corrections are not instantaneous: heater power, room temperature, and sensor readings all have dynamics. Aggressive correction can therefore overshoot or oscillate.

To see why measurement noise matters, substitute $y_m=y+n$ into the error equation: $e=r-y-n$. A controller that reacts strongly to rapid changes in $e$ may also react strongly to noise. This is the seed of a tradeoff that appears again in the sensitivity and PID lectures: use enough feedback to reject real disturbances, but not so much that the actuator chases noise.

**Self-check.** If a disturbance pushes a position-controlled system to the right while its reference stays fixed, what is the sign of the immediate position error? For a positive-right coordinate system, the measured position rises and $e=r-y_m$ becomes negative, calling for a corrective leftward action if the controller has the appropriate sign.

## 2. Linear time-invariant (LTI) systems

This course principally studies **linear, time-invariant, feedback control**. A system $\mathcal S$ is linear if inputs satisfy the superposition property

$$\mathcal S[a u_1+b u_2]=a\mathcal S[u_1]+b\mathcal S[u_2]$$

for arbitrary signals $u_1,u_2$ and scalars $a,b$, assuming zero initial conditions when applying the property to input-output maps. Linearity combines *additivity* with *homogeneity*. A system is **time-invariant** if shifting an input in time shifts its output by the same amount without changing the input-output relation:

$$\mathcal S[u(t-t_0)] = y(t-t_0)\quad\text{whenever }\mathcal S[u(t)]=y(t).$$

For example, the differential equation $m\ddot x+c\dot x+kx=u$ is LTI if $m,c,k$ are constant. The equation $m\ddot x+kx^3=u$ is nonlinear, and $m(t)\ddot x+kx=u$ is time-varying. Physical plants are often nonlinear, but an LTI approximation near an operating point can be accurate enough for useful controller design.

### Test linearity and time invariance separately

A practical test for linearity is to find the output caused by an input, double the input, and ask whether the output doubles. An ideal spring with force $F=kx$ passes this test; a spring with $F=kx+k_3x^3$ does not. Time invariance asks a different question: would the same input pulse applied tomorrow produce the same *shape* of output, merely delayed? If the system's parameters change with time, the answer may be no, even if the equations are linear in the state and input.

An affine equation such as $\dot x=-2x+3u+5$ is **not linear in the original coordinates**, because a zero input and zero state still produce a nonzero derivative. After shifting to an equilibrium, however, the perturbation equation may be linear: $\delta\dot x=-2\delta x+3\delta u$. This explains why perturbation variables are so useful. Also remember that an LTI model can have nonzero initial conditions; it is the *zero-state input-output map* for which the clean superposition statement holds.

## 3. State-space descriptions of nonlinear plants

A general nonlinear model has the form

$$\dot{\mathbf x}=\mathbf f(\mathbf x,\mathbf u),\qquad \mathbf y=\mathbf g(\mathbf x,\mathbf u),$$

where $\mathbf x\in\mathbb R^n$ is the state, $\mathbf u\in\mathbb R^m$ the control input, and $\mathbf y\in\mathbb R^p$ the output. The state summarizes the information needed, together with future input, to determine the system's future behavior. For a mechanical system it often contains positions and velocities.

The function $\mathbf f$ represents the dynamics, while $\mathbf g$ describes what is measured. An important distinction is that state space is a mathematical representation; a linearized state-space system is only a **local approximation** to the nonlinear plant from which it was derived.

### How to choose a state

The state is not merely a list of every physical quantity you could measure. It is the smallest collection, in a given model, that makes future evolution predictable once the input is specified. For a mass-spring-damper, position alone is insufficient: two masses at the same position but moving in opposite directions will behave differently. Choose $x_1=q$ and $x_2=\dot q$; then

$$\dot x_1=x_2,\qquad \dot x_2=-\frac{k}{m}x_1-\frac{c}{m}x_2+\frac{1}{m}u.$$

If only displacement is sensed, $y=x_1$; if an accelerometer is also present, the output equation changes without changing the underlying state dynamics. This distinction between **internal state** and **measured output** becomes important for observability and state estimation later in controls. Inputs cause changes; states retain the system's memory; outputs report selected consequences.

## 4. Taylor series: the mathematical reason linearization works

Near a point $a$, a smooth scalar function admits the expansion

$$f(x)=f(a)+f'(a)(x-a)+\frac{f''(a)}{2!}(x-a)^2+\cdots.$$

Retaining the constant and first-order terms gives the local affine approximation

$$f(x)\approx f(a)+f'(a)(x-a).$$

For instance, near $x=0$, $\sin x\approx x$; near $x=\pi$, $\sin x\approx -(x-\pi)$. Thus the same nonlinear physical model can have quite different local linear dynamics near different equilibria.

For a vector-valued function, the derivative is a **Jacobian matrix**. If $\mathbf f:\mathbb R^n\to\mathbb R^p$, the entry in row $i$ and column $j$ is $\partial f_i/\partial x_j$. With both state and input variables, the multivariable Taylor expansion is

$$\mathbf f(\mathbf x,\mathbf u)\approx\mathbf f(\mathbf x_e,\mathbf u_e)+\left.\frac{\partial\mathbf f}{\partial\mathbf x}\right|_e(\mathbf x-\mathbf x_e)+\left.\frac{\partial\mathbf f}{\partial\mathbf u}\right|_e(\mathbf u-\mathbf u_e).$$

Higher-order terms are neglected; therefore the approximation deteriorates for sufficiently large departures from the expansion point.

### Taylor expansion is a local slope model

Imagine drawing a tangent line to a curved function. Near the tangent point, the tangent predicts the curve well; far away, it may be completely misleading. For example, linearizing $f(x)=x^2$ about $x_e=2$ gives $f(x)\approx 4+4(x-2)$. At $x=2.1$ the approximation is $4.4$, close to the true value $4.41$; at $x=5$ it predicts $16$ instead of $25$.

For multiple variables, each column of the Jacobian answers a sensitivity question: how much does one component of the dynamics change for a small increase in one state, holding the others fixed? The neglected terms are of quadratic order in the perturbation when the model is sufficiently smooth. Thus halving an already small perturbation tends to reduce the leading local approximation error by roughly a factor of four. This error statement is local and does not guarantee a stable or accurate linear model over long trajectories.

## 5. Equilibrium points and perturbation variables

An **equilibrium** $ (\mathbf x_e,\mathbf u_e)$ is a constant state and constant input satisfying

$$\mathbf f(\mathbf x_e,\mathbf u_e)=\mathbf 0.$$

Define deviations $\delta\mathbf x=\mathbf x-\mathbf x_e$, $\delta\mathbf u=\mathbf u-\mathbf u_e$, and $\delta\mathbf y=\mathbf y-\mathbf y_e$. Substitute these into the Taylor series. Because the equilibrium term is zero, the perturbations obey the linear time-invariant approximation

$$\boxed{\delta\dot{\mathbf x}=A\,\delta\mathbf x+B\,\delta\mathbf u,\qquad\delta\mathbf y=C\,\delta\mathbf x+D\,\delta\mathbf u}$$

with the four Jacobian matrices

$$A=\left.\frac{\partial\mathbf f}{\partial\mathbf x}\right|_e,\quad B=\left.\frac{\partial\mathbf f}{\partial\mathbf u}\right|_e,\quad C=\left.\frac{\partial\mathbf g}{\partial\mathbf x}\right|_e,\quad D=\left.\frac{\partial\mathbf g}{\partial\mathbf u}\right|_e.$$

The dimensions are $A\in\mathbb R^{n\times n}$, $B\in\mathbb R^{n\times m}$, $C\in\mathbb R^{p\times n}$, and $D\in\mathbb R^{p\times m}$. The $D$ matrix describes an instantaneous input-to-output feedthrough; it is frequently zero for mechanical position measurements.

**A reliable five-step procedure:** write the full nonlinear state equations; solve $\mathbf f=0$ for an equilibrium; evaluate $A,B,C,D$ there; introduce perturbation variables; and finally express the perturbation equations in standard state-space form. Finding Jacobians before choosing the equilibrium is not wrong, but evaluating them at the wrong point gives the wrong linear model.

### A complete one-state example

Consider the nonlinear system $\dot x=-x^3+u$, with output $y=x^2$. Suppose we want to operate near the equilibrium $x_e=1$. Solving $0=-x_e^3+u_e$ gives $u_e=1$ and $y_e=1$. The Jacobians are $A=-3x_e^2=-3$, $B=1$, $C=2x_e=2$, and $D=0$. Consequently,

$$\delta\dot x=-3\delta x+\delta u,\qquad \delta y=2\delta x.$$

This procedure illustrates two common omissions. First, **an equilibrium includes an input**: here $u_e=1$, not zero. Second, $\delta y$ measures change relative to $y_e$, not the full output $y$. If you need the original signal, reconstruct $y\approx y_e+\delta y$. As a quick dimension check, $A$ maps state deviation to state-derivative deviation and $B$ maps input deviation to state-derivative deviation.

## 6. Example: linearizing an inverted pendulum

Choose the pendulum's angular position and angular velocity as states $x_1=\theta$, $x_2=\dot\theta$. As an example of the sign convention used in the handwritten model, let the applied torque oppose positive angular acceleration:

$$\ddot\theta=\frac{g}{\ell}\sin\theta-\frac{1}{m\ell^2}u.$$

Hence

$$\dot x_1=x_2,\qquad\dot x_2=\frac{g}{\ell}\sin x_1-\frac{1}{m\ell^2}u,\qquad y=x_1.$$

At an equilibrium with $u_e=0$, we need $x_{2,e}=0$ and $\sin x_{1,e}=0$. Around the upright operating point $x_{1,e}=0$, the matrices are

$$A=\begin{bmatrix}0&1\\g/\ell&0\end{bmatrix},\quad B=\begin{bmatrix}0\\-1/(m\ell^2)\end{bmatrix},\quad C=\begin{bmatrix}1&0\end{bmatrix},\quad D=0.$$

The eigenvalues of $A$ are $\pm\sqrt{g/\ell}$, one of which is positive. This reveals why an upright unactuated pendulum falls away from its equilibrium. If the positive torque direction were defined differently, $B$ would change sign but the uncontrolled instability would remain.

Around the downward equilibrium $\theta_e=\pi$, the derivative of $\sin\theta$ is negative and the corresponding $A_{21}$ becomes $-g/\ell$. That equilibrium has oscillatory rather than exponentially diverging behavior in this frictionless model. The lesson is that **linearization is about an operating point, not about permanently replacing a nonlinear system with a linear one**.

### Why the sign of gravity changes the local physics

For the upright pendulum, a small positive angle produces gravitational acceleration in the direction of a larger angle: $\ddot\theta\approx(g/\ell)\theta$. Try a solution $\theta(t)=e^{\lambda t}$; then $\lambda^2=g/\ell$ and $\lambda=\pm\sqrt{g/\ell}$. The positive root makes a small lean grow exponentially. Near the downward position, writing $\theta=\pi+\delta\theta$ gives $\sin(\pi+\delta\theta)\approx-\delta\theta$ and $\delta\ddot\theta=-(g/\ell)\delta\theta$, producing undamped oscillations.

For a numerical sense of scale, if $\ell=1\,\mathrm m$, the unstable growth rate is about $3.13\,\mathrm{s}^{-1}$. An open-loop angular error can therefore grow rapidly. A feedback controller must change the effective local dynamics, not merely cancel a constant offset. Be careful with torque conventions: the actuator sign in $B$ determines whether *positive* controller gain is stabilizing or destabilizing.

## 7. Block diagrams and signal algebra

A block diagram is a graphical rendering of a collection of equations. A block marked $G(s)$ means the Laplace-domain output equals $G(s)$ times the input, assuming the transfer-function model is applicable. A summation node adds or subtracts signals; a branch copies a signal. The arrows carry signals and not physical objects.

For two blocks in series, $y=G_2(G_1u)$, so $G_{\rm eq}=G_1G_2$. For blocks in parallel, the outputs sum, giving $G_{\rm eq}=G_1+G_2$. In a **negative feedback** loop, $e=r-Hy$ and $y=Ge$, so

$$y=G(r-Hy)\quad\Longrightarrow\quad\boxed{\frac{y}{r}=\frac{G}{1+GH}}.$$

For **positive feedback**, $e=r+Hy$, giving $G/(1-GH)$. The sign at the summation junction is critical; a positive-feedback denominator is not interchangeable with a negative-feedback denominator.

If a controller $C$ and plant $G$ appear in series under unity negative feedback, then

$$L=CG,\qquad\frac{Y}{R}=\frac{CG}{1+CG}.$$

The product $L$ is the loop transfer function. Later lectures use it to study the closed-loop poles, steady-state error, robustness, and stability margins.

### Derive a loop instead of memorizing the fraction

Never start a block-diagram problem by guessing the closed-loop formula. Write the signal equations at every node. For unity negative feedback, $e=r-y$, $u=Ce$, and $y=Gu$. Substituting gives $y=GC(r-y)$, then $(1+GC)y=GCr$. The numerator describes the forward path from the chosen input to the output; the denominator describes the feedback interaction.

An instructive example is a first-order plant $G(s)=1/(s+2)$ with proportional control $C(s)=K$. The closed-loop transfer function is

$$T(s)=\frac{K}{s+2+K}.$$

For $K>0$, the pole moves left as gain increases, making the ideal closed-loop response faster, but its steady-state gain remains $K/(K+2)<1$. This single example links block algebra to poles, speed, and tracking error. It also shows that raising gain affects both numerator and denominator: do not treat the controller as just an output multiplier.

## 8. Moving summation and branch points

Block diagrams are algebraic, so simplification should preserve the exact expression for every affected signal. Moving a sum from *before* a block $G$ to *after* it requires multiplying the other signal by $G$; moving it backward requires dividing by $G$, where that division is meaningful. Likewise, moving a takeoff point across a block may require a compensating factor.

For example, suppose a disturbance $d_i$ is added just before the plant and another disturbance $d_o$ just after it:

$$y=G\big[C(r-y)+d_i\big]+d_o.$$

Collect the output terms to obtain

$$\boxed{Y=\frac{CG}{1+CG}R+\frac{G}{1+CG}D_i+\frac{1}{1+CG}D_o.}$$

This equation shows why the **location of the disturbance** matters: an actuator-side disturbance is filtered by $G/(1+L)$, whereas an output disturbance is filtered by $1/(1+L)$. Block diagram rearrangements are valuable because they make these different paths visible.

### Disturbance location is part of the problem definition

Suppose $G(s)=1/(s+1)$ and $C(s)=2$. An output disturbance has transfer function $S(s)=1/(1+L)=(s+1)/(s+3)$, while a disturbance added to the plant input has transfer $GS=1/(s+3)$. These expressions have the same characteristic denominator, but their numerators differ; their step responses therefore differ.

To move a summing junction across a dynamic block correctly, you must preserve the signal at *every* branch of interest. Dividing by $G(s)$ is mathematically delicate if $G$ is noninvertible or if its inverse is noncausal or unstable. Algebraically equivalent diagrams need not be equally practical implementations. In homework, label disturbance injection points explicitly before simplification. The location predicts which plant factors appear in the disturbance-to-output numerator.

## 9. From block algebra to a systematic control vocabulary

Several ideas introduced here reappear throughout the course. The plant and controller can be modeled as rational transfer functions in the Laplace variable $s$. State-space linearization supplies one way of obtaining those models from mechanics. Negative feedback creates the characteristic denominator $1+L(s)$, and the zeros of that denominator determine closed-loop poles. Later we will replace time-domain differential equations by algebraic relations and explore how to shape $L$ to achieve stability, tracking, disturbance rejection, and noise tolerance.

**Check your understanding.** Given a new mechanical system, identify its states, its actuator input, and its measured output; find a plausible equilibrium; write down the Jacobian linearization; and derive the closed-loop transfer function from the block diagram *without* relying on a memorized picture.

### A vocabulary map for the rest of the course

The **plant** is the physics; the **controller** is the rule deciding the input; the **loop transfer** $L=CG$ combines them around the feedback path. The **closed-loop transfer** $T=L/(1+L)$ tells how a reference reaches the output in unity feedback. The **sensitivity** $S=1/(1+L)$ tells how some disturbances and model perturbations leak through. They satisfy $S+T=1$, which already hints that they cannot both be tiny at the same frequency.

Use this sequence when approaching a new control problem: define input/output signals and their signs, obtain or linearize the plant model, derive the transfer functions, check stability, and only then tune performance. A tidy block diagram is valuable not because it is decorative but because it makes every signal path and modeling assumption inspectable.


## Practice problems and worked solutions

### Problem 1 — Find an equilibrium and linearize

Given $\dot x=2x-x^3+u$ and $y=x$, linearize about $x_e=1$.

**Worked solution.** At equilibrium $0=2(1)-1+u_e$, so $u_e=-1$. The derivatives are $A=2-3x_e^2=-1$, $B=1$, $C=1$, $D=0$. Hence $\delta\dot x=-\delta x+\delta u$ and $\delta y=\delta x$. The local model is stable for small unforced perturbations because its single eigenvalue is $-1$.

### Problem 2 — Close a feedback loop

With $G(s)=2/(s+4)$, $C(s)=K$ and unity negative feedback, derive $T(s)$.

**Worked solution.** From $y=GC(r-y)$, $Y/R=GC/(1+GC)=2K/(s+4+2K)$. The closed-loop pole is $-(4+2K)$; for positive $K$ it stays in the left-half plane. The DC gain is $2K/(4+2K)$, so finite positive gain leaves nonzero unit-step error.

### Problem 3 — Explain a modeling limitation

Why can linearization near a pendulum's upright equilibrium be useful even though a real pendulum is nonlinear?

**Worked solution.** For sufficiently small angular deviations, $\sin\theta\approx\theta$ and the Jacobian gives an accurate local model. This supports local stability and controller calculations. It does not promise accuracy for large-angle swings or changes of operating point; those require the nonlinear equations or a new local model.



## Exam mastery — From a diagram or nonlinear equation to a defensible answer

### Derivation A: equilibrium and Jacobian linearization without skipped steps

Start with $\dot x=f(x,u)$, choose a constant operating point $(x_0,u_0)$, and enforce $f(x_0,u_0)=0$. Write $x=x_0+\delta x$, $u=u_0+\delta u$ and apply Taylor's theorem:

$$f(x_0+\delta x,u_0+\delta u)=f(x_0,u_0)+\left.\frac{\partial f}{\partial x}\right|_0\delta x+\left.\frac{\partial f}{\partial u}\right|_0\delta u+O(\|\delta\|^2).$$

Cancel the equilibrium term and discard higher-order perturbations. A state derivative must be taken **before substituting the equilibrium**, or a term like $\sin\theta$ may be accidentally replaced by zero before its derivative $\cos\theta$ can contribute.

**Apply it to the midterm bus.** With $f(v,u)=(u-kv^2)/m$, $u_0=kv_0^2$, $A=-2kv_0/m$, and $B=1/m$. Thus $\delta\dot v=A\delta v+B\delta u$, giving $\Delta V/\Delta U=1/(ms+2kv_0)$. Every step is dimensionally checkable.

**Apply it to Homework 1 ball-and-beam.** The equilibrium input compensates gravity, $u_0=mgp_0$. The Jacobian row governing ball acceleration is sensitive to **beam angle**, not to the torque directly, while the beam acceleration row is sensitive to torque through its inertia. This is why a four-state model captures how torque first changes angular acceleration, then beam angle, then ball position.

### Derivation B: write loop equations instead of chasing block arrows

For unity negative feedback and forward transfer $F$, start with $e=r-y$ and $y=Fe$. Substitute $y=F(r-y)$; rearrange $(1+F)y=Fr$; only then state $Y/R=F/(1+F)$. For a nonunity sensor $H$, substitute $e=r-Hy$, yielding $Y/R=F/(1+FH)$. If a disturbance enters **after** the plant, $y=F(r-Hy)+d$, so its transfer is $Y/D=1/(1+FH)$; if it enters at the plant input, the numerator includes the plant factor. This one derivation solves multiple homework and exam questions.

**Exam habit.** Before simplifying any block diagram, mark the exact sign of each summer, distinguish a reference feedforward path from the measured feedback path, and perform the check $F=0$ or $H=0$ to see whether the result reduces sensibly.

### A five-minute practice check

Derive $A,B,C,D$ for $\ddot q=-2\dot q-3\sin q+u$ near $(q_0,\dot q_0,u_0)=(0,0,0)$, measuring $q$. **Answer:** $x=[q,\dot q]^T$, $A=\begin{bmatrix}0&1\\-3&-2\end{bmatrix}$, $B=[0,1]^T$, $C=[1,0]$, $D=0$. Near $q_0=\pi$ the local stiffness term becomes **$+3$**, giving a potentially unstable linearization even though the original physical equation is unchanged.



---

<!-- Exam-ready derivation lab — HTML supplement; editable, preserved exactly as on the web page. -->

<section class="mastery-lab" id="deep-derivation"><p class="lab-kicker">From physical law to exam answer</p><h2>Derivation lab: linearize a nonlinear vehicle model</h2>
<p><strong>Start with a model, not a memorized transfer function.</strong> For motion in a known forward direction, use the quadratic aerodynamic drag model from Midterm Problem 1. Newton’s law gives</p>
<div class="math-block">\[m\dot v=u-kv^2,\qquad v\ge0.\]</div>
<p>A constant-speed equilibrium must satisfy zero acceleration, so <span class="math">\(0=u_0-kv_0^2\)</span> and <span class="math">\(u_0=kv_0^2\)</span>. Write <span class="math">\(v=v_0+\delta v\)</span> and <span class="math">\(u=u_0+\delta u\)</span>. Expand the nonlinear drag exactly:</p>
<div class="math-block">\[m\delta\dot v=(u_0+\delta u)-k(v_0^2+2v_0\delta v+\delta v^2).\]</div>
<p>The equilibrium terms cancel. For sufficiently small perturbations, neglect the second-order quantity <span class="math">\((\delta v)^2\)</span>:</p>
<div class="math-block">\[m\delta\dot v+2kv_0\delta v=\delta u\quad\Rightarrow\quad\boxed{\frac{\Delta V(s)}{\Delta U(s)}=\frac1{ms+2kv_0}.}\]</div>
<p>The pole is <span class="math">\(-2kv_0/m\)</span>, so greater operating speed means stronger local aerodynamic damping. This is a <em>perturbation</em> transfer function—not a formula for the total speed from zero—and requires <span class="math">\(m&gt;0\)</span>, <span class="math">\(k\ge0\)</span>, and a forward-speed operating point.</p>
<details class="quick-check"><summary>Test your understanding: what if the equilibrium is at rest?</summary><p>At <span class="math">\(v_0=0\)</span> the linear drag coefficient from <span class="math">\(kv^2\)</span> is zero. The linearized plant is an integrator, <span class="math">\(\Delta V/\Delta U=1/(ms)\)</span>. This does not mean the original nonlinear drag vanishes for finite speeds.</p></details><p class="exam-link">Apply this method in <a href="midterm.html#problem-1-longitudinal-bus-model-newton-s-law-to-transfer-function">Midterm Problem 1</a> and <a href="homework-01.html">Homework 1</a>.</p></section>
