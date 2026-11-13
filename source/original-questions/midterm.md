# Midterm — Source question statements

## Original question for section 1

![Original bus force diagram](figures/question-mid-p1-bus.webp)

The figure shows a **bus** with mass $m$, engine force $u$, and aerodynamic drag $F_A=k\dot x^{\,2}$.

(a) Use **Newton's second law** to derive the equations of motion.

(b) Define $\dot x=v$ and find the equilibrium engine input $u_0$ that maintains speed $v_0$.

(c) **Linearize** the equations of motion at $(v_0,u_0)$.

(d) Derive the **transfer function** from engine input $u$ to speed $v$.

---

## Original question for section 2

Consider
$$G_1(s)=\frac{1}{s^2+0.1s+1},\qquad G_2(s)=\frac{1}{s^2+s+10},$$
$$G_3(s)=\frac{s-1}{s^2+2s+1},\qquad G_4(s)=\frac{s+1}{s^2+2s+1}.$$

**Match each transfer function** to step-response graphs **A, B, C, D** on the accompanying exam figure. Justify **every** pair using **poles, zeros, damping ratio, transient shape and/or steady-state gain**. The exam explicitly says **process of elimination is not sufficient**.

![Original four labeled step responses A B C D](figures/question-mid-p2-plots.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*


---

## Original question for section 3

Consider the original block diagram below with PI controller $C(s)=k_p+k_I/s$, plant $G(s)=a/(s+a)$, **input disturbance $d$** and measurement noise $n$; assume $a>0$.

(a) Determine conditions on $k_p$ and $k_I$ such that the closed loop is **stable**.

(b) Find $k_p,k_I$ so the closed-loop transfer function from reference $r$ to output $y$ has **rise time less than $T_r$** and **settling time less than $T_s$** for a step.

![Original PI control feedback diagram with a, d and n](figures/question-mid-p3-diagram.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*


---

## Original question for section 4

Consider the diagram with PI controller $C(s)=k_p+k_I/s$ and plant $G(s)=1/(s+1)$, input disturbance $d$ and sensor noise $n$.

Match the **disturbance-to-output** Bode responses **A, B, C, D** to these four controller settings:

| $k_p$ | $k_I$ | Plot |
|---:|---:|:---|
| 1 | 0 | ? |
| 10 | 0 | ? |
| 1 | 1 | ? |
| 1 | 10 | ? |

Explain every pairing using **poles, zeros, damping ratios or frequency response**. Process of elimination alone is not accepted.

![Original disturbance-to-output feedback diagram](figures/question-mid-p4-diagram.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*


![Original four Bode plots labeled A B C D](figures/question-mid-p4-plots.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*


---

## Original question for section 5

The original block diagram has a feedback controller $C_1(s)$, plant $G(s)$, output disturbance $G_d(s)d_0(s)$, and measured-gust **feedforward** controller $C_2(s)$. The gust $d_0$ can sometimes be measured directly.

(a) Derive the transfer function from the **gust** $d_0$ to measured **pitch rate** $y$.

(b) Select $C_2$ so the gust has **zero effect** on $y$.

(c) If the feedforward controller cannot cancel the gust perfectly, what else can be done to minimize gust effects on measured pitch rate?

![Original disturbance feedforward and feedback block diagram](figures/question-mid-p5-diagram.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*
