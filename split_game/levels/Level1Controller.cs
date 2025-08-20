using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using System.Collections;

public class Level1Controller : MonoBehaviour
{
    [Header("关卡UI元素")]
    public Button pauseButton;
    public Button resumeButton;
    public Button restartButton;
    public Button menuButton;
    public GameObject pausePanel;
    public Text scoreText;
    public Text timerText;

    [Header("玩家相关")]
    public GameObject player;
    public Transform spawnPoint;

    [Header("游戏设置")]
    public float levelTime = 120f; // 关卡时长(秒)
    private float currentTime;
    private int score = 0;
    private bool isPaused = false;
    private bool isGameOver = false;

    [Header("音频设置")]
    public AudioClip backgroundMusic;
    public AudioClip buttonClickSound;
    private AudioSource audioSource;

    void Start()
    {
        InitializeLevel();
        SetupButtons();
        PlayBackgroundMusic();
    }

    void Update()
    {
        if (!isPaused && !isGameOver)
        {
            UpdateTimer();
        }
    }

    /// <summary>
    /// 初始化关卡
    /// </summary>
    private void InitializeLevel()
    {
        currentTime = levelTime;
        score = 0;
        isPaused = false;
        isGameOver = false;

        // 初始化音频源
        audioSource = gameObject.AddComponent<AudioSource>();
        audioSource.loop = true;

        // 确保暂停面板初始状态为隐藏
        if (pausePanel != null)
        {
            pausePanel.SetActive(false);
        }

        UpdateScoreText();
        UpdateTimerText();
    }

    /// <summary>
    /// 设置按钮事件
    /// </summary>
    private void SetupButtons()
    {
        if (pauseButton != null)
        {
            pauseButton.onClick.AddListener(TogglePause);
            AddHoverEffect(pauseButton);
        }

        if (resumeButton != null)
        {
            resumeButton.onClick.AddListener(TogglePause);
            AddHoverEffect(resumeButton);
        }

        if (restartButton != null)
        {
            restartButton.onClick.AddListener(RestartLevel);
            AddHoverEffect(restartButton);
        }

        if (menuButton != null)
        {
            menuButton.onClick.AddListener(ReturnToMenu);
            AddHoverEffect(menuButton);
        }
    }

    /// <summary>
    /// 为按钮添加悬停效果
    /// </summary>
    /// <param name="button">目标按钮</param>
    private void AddHoverEffect(Button button)
    {
        EventTrigger eventTrigger = button.gameObject.GetComponent<EventTrigger>() 
            ?? button.gameObject.AddComponent<EventTrigger>();

        // 鼠标进入事件
        EventTrigger.Entry pointerEnter = new EventTrigger.Entry();
        pointerEnter.eventID = EventTriggerType.PointerEnter;
        pointerEnter.callback.AddListener((data) => { OnPointerEnter(button); });

        // 鼠标退出事件
        EventTrigger.Entry pointerExit = new EventTrigger.Entry();
        pointerExit.eventID = EventTriggerType.PointerExit;
        pointerExit.callback.AddListener((data) => { OnPointerExit(button); });

        eventTrigger.triggers.Add(pointerEnter);
        eventTrigger.triggers.Add(pointerExit);
    }

    /// <summary>
    /// 播放背景音乐
    /// </summary>
    private void PlayBackgroundMusic()
    {
        if (backgroundMusic != null && audioSource != null)
        {
            audioSource.clip = backgroundMusic;
            audioSource.Play();
        }
    }

    /// <summary>
    /// 播放按钮点击音效
    /// </summary>
    private void PlayButtonClickSound()
    {
        if (buttonClickSound != null && audioSource != null)
        {
            audioSource.PlayOneShot(buttonClickSound);
        }
    }

    /// <summary>
    /// 更新计时器
    /// </summary>
    private void UpdateTimer()
    {
        currentTime -= Time.deltaTime;
        UpdateTimerText();

        if (currentTime <= 0)
        {
            currentTime = 0;
            GameOver();
        }
    }

    /// <summary>
    /// 更新计时器显示
    /// </summary>
    private void UpdateTimerText()
    {
        if (timerText != null)
        {
            int minutes = Mathf.FloorToInt(currentTime / 60);
            int seconds = Mathf.FloorToInt(currentTime % 60);
            timerText.text = string.Format("{0:00}:{1:00}", minutes, seconds);
        }
    }

    /// <summary>
    /// 更新分数显示
    /// </summary>
    private void UpdateScoreText()
    {
        if (scoreText != null)
        {
            scoreText.text = "分数: " + score;
        }
    }

    /// <summary>
    /// 切换暂停状态
    /// </summary>
    public void TogglePause()
    {
        PlayButtonClickSound();
        isPaused = !isPaused;

        if (isPaused)
        {
            Time.timeScale = 0;
            if (pausePanel != null)
                pausePanel.SetActive(true);
        }
        else
        {
            Time.timeScale = 1;
            if (pausePanel != null)
                pausePanel.SetActive(false);
        }
    }

    /// <summary>
    /// 重新开始关卡
    /// </summary>
    public void RestartLevel()
    {
        PlayButtonClickSound();
        Time.timeScale = 1;
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    /// <summary>
    /// 返回主菜单
    /// </summary>
    public void ReturnToMenu()
    {
        PlayButtonClickSound();
        Time.timeScale = 1;
        SceneManager.LoadScene("MainMenu");
    }

    /// <summary>
    /// 增加分数
    /// </summary>
    /// <param name="points">增加的分数</param>
    public void AddScore(int points)
    {
        score += points;
        UpdateScoreText();
    }

    /// <summary>
    /// 玩家死亡处理
    /// </summary>
    public void PlayerDied()
    {
        if (!isGameOver)
        {
            isGameOver = true;
            GameOver();
        }
    }

    /// <summary>
    /// 关卡结束处理
    /// </summary>
    private void GameOver()
    {
        isGameOver = true;
        // 可以在这里添加游戏结束逻辑
        Debug.Log("关卡结束");
    }

    /// <summary>
    /// 鼠标进入按钮时的悬停效果
    /// </summary>
    /// <param name="button">目标按钮</param>
    public void OnPointerEnter(Button button)
    {
        StopCoroutine("ScaleButton");
        StartCoroutine(ScaleButton(button, 1.1f));
    }

    /// <summary>
    /// 鼠标离开按钮时恢复原始大小
    /// </summary>
    /// <param name="button">目标按钮</param>
    public void OnPointerExit(Button button)
    {
        StopCoroutine("ScaleButton");
        StartCoroutine(ScaleButton(button, 1.0f));
    }

    /// <summary>
    /// 按钮缩放动画协程
    /// </summary>
    /// <param name="button">目标按钮</param>
    /// <param name="targetScale">目标缩放比例</param>
    private IEnumerator ScaleButton(Button button, float targetScale)
    {
        Vector3 startScale = button.transform.localScale;
        Vector3 endScale = new Vector3(targetScale, targetScale, targetScale);
        
        float elapsedTime = 0;
        float duration = 0.3f;
        
        while (elapsedTime < duration)
        {
            elapsedTime += Time.unscaledDeltaTime;
            float percentage = elapsedTime / duration;
            
            button.transform.localScale = Vector3.Lerp(startScale, endScale, percentage);
            yield return null;
        }
        
        button.transform.localScale = endScale;
    }
}